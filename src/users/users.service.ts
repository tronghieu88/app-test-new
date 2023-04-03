import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { LoginInput, RegisterInput } from 'src/auth/dto/auth.dto';
import { LoggerService } from 'src/logger/logger.service';
import { throwIfExisted, throwIfNotExists } from 'src/utils/model.utils';
import { FilterGetOneUser, UpdateCurrentUser, UserInput } from './dto/user.dto';
import { User, UserDocument, UserResult } from './entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('UserService');
  }

  async create(userInput: UserInput): Promise<User> {
    const userExist = await this.userModel.findOne({ email: userInput.email });
    // if (userExist) {
    //   console.log('type ' + userExist);
    //   throw new ConflictException('Email đã tồn tại!');
    // }
    // console.log('exist ' + userExist);
    throwIfExisted(userExist, 'Email đã tồn tại!');
    const hashPassword = await this.hashPassword(userInput.password);
    userInput.password = hashPassword;
    return await this.userModel.create(userInput);
  }

  async findOne(userName: string): Promise<User | null> {
    const user = await this.userModel.findOne({ userName: userName });

    throwIfNotExists(user, 'Không tìm thấy User!');
    return user;
  }

  async findOneFilter(filter: FilterGetOneUser): Promise<User> {
    try {
      const user = await this.userModel
        .findOne(filter)
        .select('-password,-slug,-keyword,-isConfirm,-registerType');
      throwIfNotExists(user, 'Không tìm thấy User!');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(userInput: UserInput): Promise<Boolean> {
    const userUpdate = await this.userModel.findOneAndUpdate(
      { email: userInput.email },
      { $set: { isDeleted: true } },
    );
    return userUpdate ? true : false;
  }

  // async findOneAndUpdate(
  //   filter: FilterQuery<User>,
  //   update: UpdateQuery<User>,
  // ): Promise<User> {
  //   const userNew = await this.userModel.findOneAndUpdate(filter, update, {
  //     new: true,
  //   });
  //   if (userNew === null)
  //     throw new HttpException(
  //       'Không tìm thấy userName này!',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   return userNew;
  // }

  async updateOne(email: string, userInput: UserInput): Promise<Boolean> {
    const userNew = await this.userModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          userName: userInput.userName,
          password: userInput.password,
          email: email,
          phoneNumber: userInput.phoneNumber,
          age: userInput.age,
          description: userInput.description,
          role: userInput.role,
        },
      },
      {
        new: true,
      },
    );
    return userNew ? true : false;
  }

  async updateCurrentUser(
    user: User,
    updateCurrentUser: UpdateCurrentUser,
  ): Promise<Boolean> {
    // console.log(user);
    const userNew = await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          userName: updateCurrentUser.userName,

          phoneNumber: updateCurrentUser.phoneNumber,
          age: updateCurrentUser.age,
          description: updateCurrentUser.description,
          role: updateCurrentUser.role,
        },
      },
      {
        new: true,
      },
    );
    return userNew ? true : false;
  }

  async getAll(): Promise<UserResult> {
    const results = await this.userModel.find();
    const totalCount = results.length;
    return { results, totalCount };
    // const [results, totalCount] = await Promise.all([
    //   this.userModel.find(),
    //   // this.userModel.countDocuments(),
    //   this.userModel.find(),
    // ]);
    // console.log('first');
    // return { results, totalCount: totalCount.length };
  }

  async getAllAndSortUserName(option: number): Promise<UserResult> {
    let query: any;
    if (option === 1) {
      query = this.userModel.find().sort({ userName: 1 });
    } else {
      query = this.userModel.find().sort({ userName: -1 });
    }
    const [results, totalCount] = await Promise.all([
      query,

      this.userModel.countDocuments(),
    ]);
    // console.log(results);
    return { results, totalCount };
  }

  async isNotCorrectPassword(
    password: string,
    currentPassword: string,
  ): Promise<void> {
    const compare = await bcrypt.compare(password, currentPassword);
    if (!compare) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  async getOne(filter: FilterGetOneUser): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne(filter);
      return user ? user : undefined;
    } catch (error) {
      throw error;
    }
  }

  async signIn(input: LoginInput): Promise<User> {
    try {
      const user = await this.getOne({ email: input.email });
      throwIfNotExists(user, 'Tài khoản không tồn tại!');
      // console.log('user++++' + user);
      // console.log('compar ' + input.password + ' = ' + user.password);
      await this.isNotCorrectPassword(input.password, user.password);
      this.loggerService.debug('Passed password');
      return user;
    } catch (error) {
      throw error;
    }
  }

  // async signUp(register: RegisterInput): Promise<User> {
  //   try {
  //     const { password, email } = register;
  //     const userExisting = await this.getOne({ email });
  //     if (userExisting) {
  //       throw new BadRequestException('Email đã tồn tại');
  //     }

  //     return await this.userModel.create(register);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
