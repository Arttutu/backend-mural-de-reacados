import { Injectable, Logger } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Env variable ${name} é obrigatória`);
  return value;
}

@Injectable()
export class GcsService {
  private readonly logger = new Logger(GcsService.name);
  private storage: Storage;
  private bucket;

  constructor() {
    try {
       const keyFilePath = path.resolve(getEnv('GCP_KEYFILE_PATH'));
      this.storage = new Storage({
        projectId: getEnv('GCP_PROJECT_ID'),
           keyFilename: keyFilePath,
      });

      this.bucket = this.storage.bucket(getEnv('GCP_BUCKET'));
    } catch (error) {
      this.logger.error('Erro ao inicializar GCS Service:', error.message);
      throw error;
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('Arquivo inválido fornecido');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const blob = this.bucket.file(fileName);

    this.logger.debug(`Iniciando upload do arquivo: ${fileName}`);
    this.logger.debug(`Tamanho do arquivo: ${file.size} bytes`);
    this.logger.debug(`Bucket: ${this.bucket.name}`);

    const blobStream = blob.createWriteStream({
      resumable: true,
      validaton: false,
      contentType: file.mimetype,
  
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        this.logger.error('Erro no upload:', error);
        reject(new Error(`Upload falhou: ${error.message}`));
      });

     blobStream.on('finish', async () => {
  try {
 
    const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`;
    this.logger.debug(`Upload realizado com sucesso: ${publicUrl}`);
    resolve(publicUrl);
  } catch (err) {
    this.logger.error('Erro ao tornar público:', err.message);
    reject(err);
  }
});


      blobStream.end(file.buffer);
    });
  }
}
