import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { UserInput } from './dto/user.dto';
import { User, UserDocument, UserResult } from './user.entities';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userInput: UserInput): Promise<User> {
    return await this.userModel.create(userInput);
  }

  async getAll(): Promise<UserResult> {
    const [results, totalCount] = await Promise.all([
      this.userModel.find(),
      this.userModel.countDocuments(),
    ]);
    return { results, totalCount };
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

  async deleteOne(userInput: UserInput): Promise<Boolean> {
    const userUpdate = await this.userModel.findOneAndUpdate(
      { userName: userInput.userName, password: userInput.password },
      { $set: { isDeleted: true } },
    );
    return userUpdate ? true : false;
  }
}
