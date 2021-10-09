import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({ include: { projects: true } });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      include: {
        projects: {
          select: {
            project: {
              select: {
                title: true,
                subTitle: true
              }
            }
          }
        }
      },
      where: { id }
    });
    if (user) return user;
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) return user;
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  async create({ password, ...userCreateInput }: Prisma.UserCreateInput): Promise<{ createdId: string }> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        password: hash,
        ...userCreateInput
      }
    });

    return { createdId: user.id };
  }

  async update(id: string, userUpdateInput: Prisma.UserUpdateInput): Promise<{ updatedId: string }> {
    const user = await this.prisma.user.update({
      data: userUpdateInput,
      where: { id }
    });

    if (user) return { updatedId: user.id };
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string): Promise<{ removedId: string }> {
    const user = await this.prisma.user.delete({ where: { id } });
    if (user) return { removedId: user.id };
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }
}
