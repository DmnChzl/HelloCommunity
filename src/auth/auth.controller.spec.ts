import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '300s'
          }
        }),
        UsersModule
      ],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login', async () => {
    const result = {
      access_token: 'xxxxx.yyyyy.zzzzz'
    };

    jest.spyOn(service, 'login').mockResolvedValue(result);
    expect(
      await controller.login({
        user: {
          email: 'mrdoomy@mrdoomy.xyz',
          password: 'azerty'
        }
      })
    ).toEqual(result);
  });
});
