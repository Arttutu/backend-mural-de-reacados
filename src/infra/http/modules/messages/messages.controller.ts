import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessagesBody } from './dtos/createMessagesBody';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Post()
  create(@Body() body: CreateMessagesBody) {
    return this.messagesService.create(body.author, body.content, body.image);
  }
}
