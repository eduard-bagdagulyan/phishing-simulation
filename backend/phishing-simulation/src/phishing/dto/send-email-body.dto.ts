import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
