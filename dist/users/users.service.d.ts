/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { LoginInput, RegisterInput } from 'src/auth/dto/auth.dto';
import { LoggerService } from 'src/logger/logger.service';
import { ChangePasswordInput, FilterGetOneUser, UpdateCurrentUser, UserInput } from './dto/user.dto';
import { User, UserResult } from './entities/user.entities';
type UserModelType = Model<User>;
export declare class UsersService {
    private userModel;
    private loggerService;
    constructor(userModel: UserModelType, loggerService: LoggerService);
    create(userInput: UserInput): Promise<User>;
    findOne(userName: string): Promise<User | null>;
    findOneFilter(filter: FilterGetOneUser): Promise<User>;
    deleteOne(userInput: UserInput): Promise<Boolean>;
    findOneAndUpdate(filter: FilterQuery<User>, update: UpdateQuery<User>): Promise<User>;
    updateOne(mail: string, userInput: UserInput): Promise<Boolean>;
    updateCurrentUser(user: User, updateCurrentUser: UpdateCurrentUser): Promise<Boolean>;
    getAll(): Promise<UserResult>;
    getAllAndSortUserName(option: number): Promise<UserResult>;
    isNotCorrectPassword(password: string, currentPassword: string): Promise<void>;
    hashPassword(password: string): Promise<string>;
    getOne(filter: FilterGetOneUser): Promise<User | undefined>;
    signIn(input: LoginInput): Promise<User>;
    signUp(register: RegisterInput, code: string): Promise<User>;
    confirmCode(context: any, code: string): Promise<void>;
    onlyChangePassword(input: ChangePasswordInput): Promise<void>;
    changePassword(mail: string, newPassword: string, reNewPassword: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
}
export {};
