import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from './enums/gender.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', () => {
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

    jest.spyOn(service, 'findAll').mockReturnValue(result);
    expect(controller.findAll()).toEqual(result);
  });

  it('findOne', () => {
    const result = {
      id: 'abc123',
      email: 'mrdoomy@mrdoomy.xyz',
      password: 'azerty',
      firstName: 'Damien',
      lastName: 'Chazoule',
      gender: Gender.Male
    };

    jest.spyOn(service, 'findOne').mockReturnValue(result);
    expect(controller.findOne('abc123')).toEqual(result);
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

  it('update', () => {
    const result = {
      updatedId: 'abc123'
    };

    jest.spyOn(service, 'update').mockReturnValue(result);
    expect(controller.update('abc123', { gender: Gender.Female })).toEqual(result);
  });

  it('remove', () => {
    const result = {
      removedId: 'abc123'
    };

    jest.spyOn(service, 'remove').mockReturnValue(result);
    expect(controller.remove('abc123')).toEqual(result);
  });
});
