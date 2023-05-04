import mongoose, { HydratedDocument } from 'mongoose';
import { RoleEnum } from 'src/constants/enum';
import { IUser } from '../interfaces/user.interface';
export type UserDocument = HydratedDocument<User>;
export declare class UserResult implements IResult<User> {
    results: User[];
    totalCount: number;
}
export declare class UserOTP {
    mail: string;
    code: number;
}
export declare class User implements IUser {
    _id?: mongoose.Types.ObjectId;
    mail: string;
    password: string;
    userName?: string;
    phoneNumber?: string;
    age?: number;
    description?: string;
    createdAt?: Date;
    isDeleted?: boolean;
    keyword?: string;
    updatedAt?: Date;
    slug?: string;
    role?: RoleEnum;
    isConfirmMail?: boolean;
    codeMail?: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
