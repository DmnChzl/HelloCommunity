import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { generateUuid } from '../utils';

@Injectable()
export class UsersService {
  users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find(user => user.id === id);
    if (user) return user;
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  findOneByEmail(email: string): User {
    const user = this.users.find(user => user.email === email);
    if (user) return user;
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  async create({ password, ...createUserDto }: CreateUserDto): Promise<{ createdId: string }> {
    const uuid = generateUuid();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    this.users = [
      ...this.users,
      {
        id: uuid,
        password: hash,
        ...createUserDto
      }
    ];
    return { createdId: uuid };
  }

  update(id: string, updateUserDto: UpdateUserDto): { updatedId: string } {
    let founded = false;
    this.users = this.users.map(user => {
      if (user.id === id) {
        founded = true;
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    if (founded) return { updatedId: id };
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }

  remove(id: string): { removedId: string } {
    const length = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    if (length !== this.users.length) return { removedId: id };
    throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
  }
}
