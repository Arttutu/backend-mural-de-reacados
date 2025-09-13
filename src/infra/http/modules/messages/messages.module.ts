import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from '../infra/http/modules/messages/messages.controller';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
