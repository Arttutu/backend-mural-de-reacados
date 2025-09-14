import { Module } from '@nestjs/common';
import { MessagesModule } from './infra/http/modules/messages/messages.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [MessagesModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
