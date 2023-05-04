import { IUser } from '../interfaces/user.interface';
import { RegisterType, RoleEnum } from 'src/constants/enum';
export declare class UserInput implements IUser {
    mail: string;
    password: string;
    userName: string;
    phoneNumber: string;
    age: number;
    description: string;
    role: RoleEnum;
}
export declare class FilterGetOneUser implements Partial<IUser> {
    _id?: string;
    slug?: string;
    userName?: string;
    mail?: string;
    registerType?: RegisterType;
    resetPasswordCode?: string;
}
export declare class UpdateCurrentUser implements Partial<IUser> {
    userName: string;
    phoneNumber: string;
    age: number;
    description: string;
    role: RoleEnum;
}
export declare class ChangePasswordInput implements Partial<IUser> {
    mail: string;
    curentPassword: string;
    newPassword: string;
    reNewPassword: string;
}
