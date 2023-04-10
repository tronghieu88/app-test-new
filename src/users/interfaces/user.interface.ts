import { RoleEnum } from 'src/constants/enum';

export interface IUser extends IEntity {
  mail: string;
  password: string;
  userName?: string;
  phoneNumber?: string;
  age?: number;
  description?: string;
  role?: RoleEnum;
  isConfirmMail?: boolean;
  codeMail?: string;
}
