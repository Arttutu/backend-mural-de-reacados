import { Module } from '@nestjs/common';
import { MessagesModule } from './infra/http/modules/messages/messages.module';
import { PrismaService } from './prisma/prisma.service';



@Module({
  imports: [MessagesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
