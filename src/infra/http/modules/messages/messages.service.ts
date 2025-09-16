import { Injectable  } from '@nestjs/common';
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

  async deleteOldMessages() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    return this.prisma.message.deleteMany({
      where: {
        createdAt: {
          lt: tenMinutesAgo,
        },
      },
    });
  }
}
