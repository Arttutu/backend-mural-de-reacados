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
  async create(@Body() body: CreateMessagesBody) {
    const { author, content, image } = body;
    const message = await this.messagesService.create(author, content, image);
    return message;
  }
}
