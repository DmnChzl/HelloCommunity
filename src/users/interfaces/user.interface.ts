import { Gender } from '../enums/gender.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
