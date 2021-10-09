import { Injectable } from '@nestjs/common';
import { ProjectToUser } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello Community 👋';
  }

  async connect({ userEmail, projectTitle }: { userEmail: string; projectTitle: string }): Promise<ProjectToUser> {
    const projectToUser = await this.prisma.projectToUser.create({
      data: {
        userEmail,
        projectTitle
      }
    });
    return projectToUser;
  }

  async disconnect({ userEmail, projectTitle }: { userEmail: string; projectTitle: string }): Promise<ProjectToUser> {
    const projectToUser = await this.prisma.projectToUser.delete({
      where: {
        userEmail_projectTitle: {
          userEmail,
          projectTitle
        }
      }
    });
    return projectToUser;
  }
}
