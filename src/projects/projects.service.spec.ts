import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProjectsService]
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    jest.spyOn(prismaService.project, 'findMany').mockResolvedValue([
      {
        id: 1,
        title: 'Hack',
        subTitle: 'HacktoberFest',
        description: 'Open source is changing the world',
        startDate: new Date('2021-01-21T00:00:00'),
        endDate: new Date('2022-02-22T00:00:00')
      }
    ]);
    const findAllSpy = jest.spyOn(service, 'findAll');
    await service.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('findOne', async () => {
    jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue({
      id: 1,
      title: 'Hack',
      subTitle: 'HacktoberFest',
      description: 'Open source is changing the world',
      startDate: new Date('2021-01-21T00:00:00'),
      endDate: new Date('2022-02-22T00:00:00')
    });
    const findOneSpy = jest.spyOn(service, 'findOne');
    await service.findOne(1);
    expect(findOneSpy).toHaveBeenCalledWith(1);
  });

  it('create', async () => {
    jest.spyOn(prismaService.project, 'create').mockResolvedValue({
      id: 1,
      title: 'Hack',
      subTitle: 'HacktoberFest',
      description: 'Open source is changing the world',
      startDate: new Date('2021-01-21T00:00:00'),
      endDate: new Date('2022-02-22T00:00:00')
    });

    const createSpy = jest.spyOn(service, 'create');
    const data = {
      title: 'Hack',
      subTitle: 'HacktoberFest',
      description: 'Open source is changing the world',
      startDate: new Date('2021-01-21T00:00:00'),
      endDate: new Date('2022-02-22T00:00:00')
    };
    await service.create(data);
    expect(createSpy).toHaveBeenCalledWith(data);
  });

  it('update', async () => {
    jest.spyOn(prismaService.project, 'update').mockResolvedValue({
      id: 1,
      title: 'Hack',
      subTitle: 'HacktoberFest',
      description: 'One contribution at a time',
      startDate: new Date('2021-01-21T00:00:00'),
      endDate: new Date('2022-02-22T00:00:00')
    });

    const updateSpy = jest.spyOn(service, 'update');
    const data = {
      description: 'One contribution at a time'
    };
    await service.update(1, data);
    expect(updateSpy).toHaveBeenCalledWith(1, data);
  });

  it('remove', async () => {
    jest.spyOn(prismaService.project, 'delete').mockResolvedValue({
      id: 1,
      title: 'Hack',
      subTitle: 'HacktoberFest',
      description: 'One contribution at a time',
      startDate: new Date('2021-01-21T00:00:00'),
      endDate: new Date('2022-02-22T00:00:00')
    });

    const removeSpy = jest.spyOn(service, 'remove');
    await service.remove(1);
    expect(removeSpy).toBeCalledWith(1);
  });
});
