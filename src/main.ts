import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });
  app.enableCors();
  const port = await app.listen(process.env.PORT ?? 8080);
  Logger.log(`Servidor rodando na porta ${port}`, 'Bootstrap');
}
bootstrap();
