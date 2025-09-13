import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(author: string, content: string, image?: string) {
    return this.prisma.message.create({
      data: {
        author,
        content,
        image,
      },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
