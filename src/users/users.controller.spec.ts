import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { Gender } from './enums/gender.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
    const result = [
      {
        id: 'abc123',
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      }
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
  });

  it('findOne', async () => {
    const result = {
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('abc123')).toEqual(result);
  });

  it('create', async () => {
    const result = {
      createdId: 'abc123'
    };

    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(
      await controller.create({
        email: 'mrdoomy@mrdoomy.xyz',
        password: 'azerty',
        firstName: 'Damien',
        lastName: 'Chazoule',
        gender: Gender.Male
      })
    ).toEqual(result);
  });

  it('update', async () => {
    const result = {
      updatedId: 'abc123'
    };

    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await controller.update('abc123', { gender: Gender.Female })).toEqual(result);
  });

  it('remove', async () => {
    const result = {
      removedId: 'abc123'
    };

    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await controller.remove('abc123')).toEqual(result);
  });
});
