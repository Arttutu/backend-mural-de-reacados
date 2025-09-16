// messages.controller.ts
import { Body, Controller, Delete, Get, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Logger, BadRequestException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessagesBody } from './dtos/createMessagesBody';
import { FileInterceptor } from '@nestjs/platform-express';
import { GcsService } from '../../../../storage/gcs.service';
import { memoryStorage } from 'multer';

@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name);

  constructor(
    private readonly messagesService: MessagesService,
    private readonly gcsService: GcsService
  ) {}

  @Get()
  findAll() {
    this.logger.debug('GET /messages chamado');
    return this.messagesService.findAll();
  }
@UsePipes(ValidationPipe)
@UseInterceptors(
  FileInterceptor('image', {
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Formato de arquivo inválido'), false);
      }
      cb(null, true);
    },
  }),
)
@Post()
async create(
  @Body() body: CreateMessagesBody,
  @UploadedFile() file?: Express.Multer.File,
) {
  this.logger.debug('POST /messages chamado');
  this.logger.debug(`Body: ${JSON.stringify(body)}`);

  let imageUrl: string | undefined;

  // Verificar se o arquivo foi fornecido e é válido
  if (file && file.buffer && file.originalname) {
    try {
      this.logger.debug(`Arquivo recebido: ${file.originalname}, tamanho: ${file.size}`);
      imageUrl = await this.gcsService.upload(file);
      this.logger.debug(`Upload realizado. URL: ${imageUrl}`);
    } catch (error) {
      this.logger.error('Erro no upload da imagem:', error.message);
      throw new BadRequestException('Falha no upload da imagem');
    }
  } else if (file) {
    // Arquivo fornecido mas inválido
    this.logger.warn('Arquivo fornecido é inválido');
    throw new BadRequestException('Arquivo de imagem inválido');
  } else {
    this.logger.debug('Nenhum arquivo de imagem fornecido');
  }

  this.logger.debug('Criando mensagem no banco de dados...');
  return this.messagesService.create(body.author, body.content, imageUrl);
}
    @Delete('old')
  async deleteOld() {
    this.logger.debug('DELETE /messages/old chamado');
    return this.messagesService.deleteOldMessages();
  }
}



