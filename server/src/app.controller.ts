import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('tokenBalance')
  getTokenBalance(): any {
    return this.appService.getTokenBalance();
  }
  @Get('tokenBalance2')
  getTokenBalance2(): any {
    return this.appService.getTokenBalance2();
  }
}
