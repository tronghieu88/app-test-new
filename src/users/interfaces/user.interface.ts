import { RoleEnum } from 'src/constants/enum';

export interface IUser extends IEntity {
  email: string;
  password: string;
  userName?: string;
  phoneNumber?: string;
  age?: number;
  description?: string;
  role?: RoleEnum;
}
