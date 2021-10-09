import { Gender } from '../enums/gender.enum';

export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
