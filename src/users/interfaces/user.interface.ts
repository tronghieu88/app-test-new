import { RoleEnum } from 'src/constants/enum';

export interface IUser extends IEntity {
  userName: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  age?: number;
  description?: string;
  role?: RoleEnum;
}
