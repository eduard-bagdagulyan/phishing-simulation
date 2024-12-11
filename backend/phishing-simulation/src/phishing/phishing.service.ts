import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PhishingService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(Attempt.name)
    private readonly attemptModel: Model<AttemptDocument>,
  ) {}

  /**
   * Sends a phishing simulation email.
   * @param {string} email - The recipient's email address.
   * @returns {Promise<string>} - A promise that resolves to a confirmation message.
   */
  async sendPhishingEmail(email: string): Promise<Attempt> {
    const attempt = new this.attemptModel({ email });

    const phishingLink = `${process.env.APP_URL}/api/phishing/click/${attempt._id}`;
    const emailContent = `
      <p>This is a phishing simulation test.</p>
      <p>Click <a href="${phishingLink}">here</a> to test your phishing awareness.</p>
    `;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Phishing email',
        html: emailContent,
      });
      await attempt.save();
      return attempt;
    } catch (e) {
      attempt.status = 'failed';
      await attempt.save();
      throw new Error(`Failed to send email: ${e?.message}`);
    }
  }

  /**
   * Updates the status of a phishing attempt to 'Clicked'.
   * @param {string} id - The ID of the phishing attempt.
   * @returns {Promise<Attempt>} - A promise that resolves to the updated phishing attempt.
   * @throws {NotFoundException} - If the phishing attempt is not found.
   */
  async updatePhishingAttempt(id: string): Promise<Attempt> {
    const attempt = await this.attemptModel.findById(id);

    if (!attempt) {
      throw new NotFoundException('Phishing attempt not found');
    }

    attempt.status = 'Clicked';
    attempt.updatedAt = new Date();
    await attempt.save();

    return attempt;
  }
}
