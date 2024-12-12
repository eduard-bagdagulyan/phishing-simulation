import { Injectable } from '@nestjs/common';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttemptsService {
  private readonly simulationServerUrl = process.env.PHISHING_SIMULATION_URL;

  constructor(
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
    private httpService: HttpService,
  ) {}

  async getAllAttempts(): Promise<Attempt[]> {
    return this.attemptModel.find();
  }

  async sendPhishingEmail(email: string): Promise<Attempt> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.simulationServerUrl}/api/phishing/send`, {
        email,
      }),
    );
    const attemptData = response.data;
    const attempt = await this.attemptModel.findById(attemptData._id);
    if (!attempt) {
      const newAttempt = new this.attemptModel(attemptData);
      return newAttempt.save();
    } else {
      attempt.status = attemptData.status;
      return attempt.save();
    }
  }
}
