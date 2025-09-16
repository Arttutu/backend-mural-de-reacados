
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateMessagesBody {
  @IsString()
  @IsNotEmpty()
  author: string;
  
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
