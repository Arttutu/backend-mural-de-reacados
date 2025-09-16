import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GcsService } from 'src/storage/gcs.service';

@Module({
  providers: [MessagesService, PrismaService, GcsService],
  controllers: [MessagesController],
})
export class MessagesModule {}
