import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly service: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello');
    return this.service.getHello();
  }

  @Post('connect')
  async connect(@Body() body: { userEmail: string; projectTitle: string }) {
    return await this.service.connect(body);
  }

  @Post('disconnect')
  async disconnect(@Body() body: { userEmail: string; projectTitle: string }) {
    return await this.service.disconnect(body);
  }
}
