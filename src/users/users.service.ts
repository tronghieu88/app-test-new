import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { LoginInput } from 'src/auth/dto/auth.dto';
import { LoggerService } from 'src/logger/logger.service';
import { throwIfNotExists } from 'src/utils/model.utils';
import { FilterGetOneUser, UserInput } from './dto/user.dto';
import { User, UserDocument, UserResult } from './entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private loggerService: LoggerService,
  ) {}

  async create(userInput: UserInput): Promise<User> {
    return await this.userModel.create(userInput);
  }

  async findOne(userName: string): Promise<User | null> {
    const user = await this.userModel.findOne({ userName: userName });
    // console.log(user);
    if (user === null)
      throw new HttpException(
        'Không tìm thấy userName này!',
        HttpStatus.NOT_FOUND,
      );
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
      { userName: userInput.userName, password: userInput.password },
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

  async updateOne(userName: string, userInput: UserInput): Promise<Boolean> {
    const userNew = await this.userModel.findOneAndUpdate(
      { userName: userName },
      {
        $set: {
          userName: userInput.userName,
          password: userInput.password,
          email: userInput.email,
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

  async getAll(): Promise<UserResult> {
    const [results, totalCount] = await Promise.all([
      this.userModel.find(),
      // this.userModel.countDocuments(),
      this.userModel.find(),
    ]);
    return { results, totalCount: totalCount.length };
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
    if (password.toString() != currentPassword.toString()) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
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
      const user = await this.getOne({ userName: input.userName });
      throwIfNotExists(user, 'Tài khoản không chính xác');
      // console.log('user++++' + user);
      // console.log('compar ' + input.password + ' = ' + user.password);
      await this.isNotCorrectPassword(input.password, user.password);
      this.loggerService.debug('Passed password');
      return user;
    } catch (error) {
      throw error;
    }
  }
}
