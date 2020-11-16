import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { TestGuard } from './test.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { hello: string } {
    return this.appService.getHello();
  }

  @Get('test-passport')
  @UseGuards(AuthGuard())
  getPassportTest() {
    return this.appService.getHello();
  }

  @Get('test-custom')
  @UseGuards(TestGuard)
  getCustomTest() {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() body) {
    return this.appService.login(body);
  }
}
