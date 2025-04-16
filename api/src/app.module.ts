import * as path from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttachmentModule } from './attachment/attachment.module';
import { AuthModule } from './auth/auth.module';
import { config } from './config';
import { MailModule } from './mailer/mail.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { SeederModule } from './seeds/seeder.module';

@Module({
  imports: [
    //TODO: in production, provide a new validation pipe to handle validation errors and show less information
    MongooseModule.forRoot(config.mongo.uri),
    UserModule,
    I18nModule.forRoot({
      fallbackLanguage: config.i18n.fallbackLanguage,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    AuthModule,
    ProductsModule,
    MailModule,
    AttachmentModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
