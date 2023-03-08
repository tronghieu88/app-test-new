import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
}
