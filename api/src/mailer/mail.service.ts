import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { config } from './../config/index';
import { SendEmailDto } from './send-email.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { receiver, subject, text, html, template, context } = sendEmailDto;
    try {
      const result = await this.mailerService.sendMail({
        from: config.mail.defaults.from,
        to: receiver,
        subject,
        text,
        html,
        template: template ? `./${template}` : undefined,
        context,
      });
      return result;
    } catch (e) {
      throw new Error('Failed to send email');
    }
  }

  async sendVerificationEmail(email: string, verificationToken: string) {
    const subject = 'Email Verification';
    const template = 'verification-email';
    const context = {
      //this is where we put variables passed to the template
      name: email.split('@')[0],
      verificationLink: `https://yourapp.com/verify?token=${verificationToken}`,
    };

    return this.sendEmail({ receiver: email, subject, template, context });
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const subject = 'Password Reset';
    const template = 'reset-password';
    const context = { resetToken };

    return this.sendEmail({ receiver: email, subject, template, context });
  }
}
