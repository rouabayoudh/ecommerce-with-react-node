import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { MailService } from './mail.service';
import { config } from '../config/index';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        ...config.mail,
        template: {
          dir: config.mailTemplate.dir,
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
