import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // TODO: Remove after testing
  /*for testing i18n
  @Get()
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t('translation.message.title');
  }*/
}
