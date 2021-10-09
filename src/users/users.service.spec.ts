import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Gender } from './enums/gender.enum';
import { UsersService } from './users.service';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', () => {
    service.users = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ];
    const findAllSpy = jest.spyOn(service, 'findAll');
    service.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('findOne', () => {
    service.users = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ];
    const findOneSpy = jest.spyOn(service, 'findOne');
    service.findOne('abc123');
    expect(findOneSpy).toHaveBeenCalledWith('abc123');
  });

  it('findOneByEmail', () => {
    service.users = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ];
    const findOneByEmailSpy = jest.spyOn(service, 'findOneByEmail');
    service.findOneByEmail('mrdoomy@mrdoomy.xyz');
    expect(findOneByEmailSpy).toHaveBeenCalledWith('mrdoomy@mrdoomy.xyz');
  });

  it('create', async () => {
    const genSaltMock = jest.fn().mockReturnValue(10);
    (bcrypt.genSalt as jest.Mock) = genSaltMock;

    const hashMock = jest.fn().mockReturnValue('qwerty');
    (bcrypt.hash as jest.Mock) = hashMock;

    const createSpy = jest.spyOn(service, 'create');
    const data = {
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    };
    await service.create(data);
    expect(createSpy).toHaveBeenCalledWith(data);
  });

  it('update', () => {
    service.users = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ];
    const updateSpy = jest.spyOn(service, 'update');
    const data = {
      gender: Gender.Female
    };
    service.update('abc123', data);
    expect(updateSpy).toHaveBeenCalledWith('abc123', data);
  });

  it('remove', () => {
    service.users = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Female
      }
    ];
    const removeSpy = jest.spyOn(service, 'remove');
    service.remove('abc123');
    expect(removeSpy).toHaveBeenCalledWith('abc123');
  });
});
