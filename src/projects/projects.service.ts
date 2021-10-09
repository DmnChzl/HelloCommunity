import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return await this.prisma.project.findMany({ include: { users: true } });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      include: {
        users: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      where: { id }
    });
    if (project) return project;
    throw new HttpException('No Project Found', HttpStatus.NOT_FOUND);
  }

  async create(projectCreateInput: Prisma.ProjectCreateInput): Promise<{ createdId: number }> {
    const project = await this.prisma.project.create({ data: projectCreateInput });
    return { createdId: project.id };
  }

  async update(id: number, projectUpdateInput: Prisma.ProjectUpdateInput): Promise<{ updatedId: number }> {
    const project = await this.prisma.project.update({
      data: projectUpdateInput,
      where: { id }
    });

    if (project) return { updatedId: project.id };
    throw new HttpException('No Project Found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<{ removedId: number }> {
    const project = await this.prisma.project.delete({ where: { id } });
    if (project) return { removedId: project.id };
    throw new HttpException('No Project Found', HttpStatus.NOT_FOUND);
  }
}
