import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  it('should return "Hello Community 👋"', () => {
    expect(controller.getHello()).toBe('Hello Community 👋');
  });
});
