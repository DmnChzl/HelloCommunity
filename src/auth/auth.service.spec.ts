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
    usersService.users = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'qwerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ];

    const compareMock = jest.fn().mockReturnValue('qwerty');
    (bcrypt.compare as jest.Mock) = compareMock;

    const validateUserSpy = jest.spyOn(service, 'validateUser');
    await service.validateUser('mrdoomy@mrdoomy.xyz', 'qwerty');
    expect(validateUserSpy).toHaveBeenCalledWith('mrdoomy@mrdoomy.xyz', 'qwerty');
  });

  it('login', () => {
    const loginSpy = jest.spyOn(service, 'login');
    const data = {
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz'
    };
    service.login(data);
    expect(loginSpy).toHaveBeenCalledWith(data);
  });
});
