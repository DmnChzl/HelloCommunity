import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Gender } from '../users/enums/gender.enum';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

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
      providers: [AuthService]
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser', async () => {
    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
      id: 'abc123',
      email: 'dmnchzl@pm.me',
      password: 'qwerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    });

    const compareMock = jest.fn().mockReturnValue('qwerty');
    (bcrypt.compare as jest.Mock) = compareMock;

    const validateUserSpy = jest.spyOn(service, 'validateUser');
    await service.validateUser('dmnchzl@pm.me', 'qwerty');
    expect(validateUserSpy).toHaveBeenCalledWith('dmnchzl@pm.me', 'qwerty');
  });

  it('login', () => {
    const loginSpy = jest.spyOn(service, 'login');
    const data = {
      id: 'abc123',
      email: 'dmnchzl@pm.me'
    };
    service.login(data);
    expect(loginSpy).toHaveBeenCalledWith(data);
  });
});
