import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { SendEmailBodyDto } from './dto/send-email-body.dto';

@Controller('attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @Get()
  async getAllAttempts() {
    return this.attemptsService.getAllAttempts();
  }

  @Post('send')
  async sendPhishingEmail(@Body() body: SendEmailBodyDto) {
    const { email } = body;
    return this.attemptsService.sendPhishingEmail(email);
  }
}
