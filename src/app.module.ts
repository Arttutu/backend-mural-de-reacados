import { Module } from '@nestjs/common';
import { MessagesModule } from './infra/http/modules/messages/messages.module';



@Module({
  imports: [MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
