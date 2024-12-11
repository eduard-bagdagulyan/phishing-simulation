import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendEmailBodyDto } from './dto/send-email-body.dto';
import { Attempt } from './schemas/attempt.schema';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async sendPhishingEmail(@Body() body: SendEmailBodyDto): Promise<Attempt> {
    const { email } = body;

    try {
      return this.phishingService.sendPhishingEmail(email);
    } catch (e) {
      throw new InternalServerErrorException(
        e?.message ?? 'Failed to send phishing email',
      );
    }
  }

  @Get('click/:id')
  async trackPhishingAttempt(@Param('id') id: string): Promise<string> {
    await this.phishingService.updatePhishingAttempt(id);
    return 'Phishing link clicked';
  }
}
