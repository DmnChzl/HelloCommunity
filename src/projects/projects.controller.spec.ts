import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ProjectsController],
      providers: [ProjectsService]
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
    const result = [
      {
        id: 1,
        title: 'Hack',
        subTitle: 'HacktoberFest',
        description: 'Open source is changing the world',
        startDate: new Date('2021-01-21T00:00:00'),
        endDate: new Date('2022-02-22T00:00:00')
      }
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
  });

  it('findOne', async () => {
    const result = {
      id: 1,
      title: 'Hack',
      subTitle: 'HacktoberFest',
      description: 'Open source is changing the world',
      startDate: new Date('2021-01-21T00:00:00'),
      endDate: new Date('2022-02-22T00:00:00')
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toEqual(result);
  });

  it('create', async () => {
    const result = {
      createdId: 1
    };

    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(
      await controller.create({
        title: 'Hack',
        subTitle: 'HacktoberFest',
        description: 'Open source is changing the world',
        startDate: new Date('2021-01-21T00:00:00'),
        endDate: new Date('2022-02-22T00:00:00')
      })
    ).toEqual(result);
  });

  it('update', async () => {
    const result = {
      updatedId: 1
    };

    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await controller.update('1', { description: 'One contribution at a time' })).toEqual(result);
  });

  it('remove', async () => {
    const result = {
      removedId: 1
    };

    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await controller.remove('1')).toEqual(result);
  });
});
