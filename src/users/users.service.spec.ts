import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { Gender } from './enums/gender.enum';
import { UsersService } from './users.service';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue([
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ]);
    const findAllSpy = jest.spyOn(service, 'findAll');
    await service.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('findOne', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    });
    const findOneSpy = jest.spyOn(service, 'findOne');
    await service.findOne('abc123');
    expect(findOneSpy).toHaveBeenCalledWith('abc123');
  });

  it('findOneByEmail', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    });
    const findOneByEmailSpy = jest.spyOn(service, 'findOneByEmail');
    await service.findOneByEmail('mrdoomy@mrdoomy.xyz');
    expect(findOneByEmailSpy).toHaveBeenCalledWith('mrdoomy@mrdoomy.xyz');
  });

  it('create', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'qwerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    });

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

  it('update', async () => {
    jest.spyOn(prisma.user, 'update').mockResolvedValue({
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Female
    });
    const updateSpy = jest.spyOn(service, 'update');
    const data = {
      gender: Gender.Female
    };
    await service.update('abc123', data);
    expect(updateSpy).toHaveBeenCalledWith('abc123', data);
  });

  it('remove', async () => {
    jest.spyOn(prisma.user, 'delete').mockResolvedValue({
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Female
    });
    const removeSpy = jest.spyOn(service, 'remove');
    await service.remove('abc123');
    expect(removeSpy).toHaveBeenCalledWith('abc123');
  });
});
