import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { LoginInput, RegisterInput } from 'src/auth/dto/auth.dto';
import { LoggerService } from 'src/logger/logger.service';
import { throwIfExisted, throwIfNotExists } from 'src/utils/model.utils';
import {
  ChangePasswordInput,
  FilterGetOneUser,
  UpdateCurrentUser,
  UserInput,
} from './dto/user.dto';
import { User, UserDocument, UserResult } from './entities/user.entities';

type UserModelType = Model<User>;

@Injectable()
export class UsersService {
  constructor(
    // @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(User.name) private userModel: UserModelType,
    // @Inject(forwardRef(() => AuthService))
    private loggerService: LoggerService, // private authService: AuthService,
  ) {
    this.loggerService.setContext('UserService');
  }

  async create(userInput: UserInput): Promise<User> {
    const userExist = await this.userModel.findOne({ mail: userInput.mail });
    // if (userExist) {
    //   console.log('type ' + userExist);
    //   throw new ConflictException('mail đã tồn tại!');
    // }
    // console.log('exist ' + userExist);
    throwIfExisted(userExist, 'Mail đã tồn tại!');
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
      { mail: userInput.mail },
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

  async findOneAndUpdate(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>,
  ): Promise<User> {
    try {
      const user = await this.userModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(mail: string, userInput: UserInput): Promise<Boolean> {
    const userNew = await this.userModel.findOneAndUpdate(
      { mail: mail },
      {
        $set: {
          userName: userInput.userName,
          password: userInput.password,
          mail: mail,
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
      { mail: user.mail },
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
      const user = await this.getOne({ mail: input.mail });
      throwIfNotExists(user, 'Tài khoản không tồn tại!');
      if (!user.isConfirmMail) {
        throw new UnauthorizedException(
          'Mail chưa được xác nhận. Vui lòng xác nhận mail của bạn',
        );
      }
      // console.log('user++++' + user);
      // console.log('compar ' + input.password + ' = ' + user.password);
      await this.isNotCorrectPassword(input.password, user.password);
      this.loggerService.debug('Passed password');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(register: RegisterInput, code: string): Promise<User> {
    // async signUp(mail: string, password: string, code): Promise<User> {
    try {
      // if (register.password != register.confirmPassword) {
      //   throw new BadRequestException('Mật khẩu không khớp');
      // }

      // const { password, mail } = register;
      // const userExisting = await this.getOne({ mail });

      // if (userExisting) {
      //   throw new BadRequestException('mail đã tồn tại');
      // }

      const [user, hashPassword] = await Promise.all([
        this.userModel.create(register),
        this.hashPassword(register.password),
      ]);
      user.password = hashPassword;
      // const mail = user.mail;
      // await this.findOneAndUpdate({ mail }, { $set: { isConfirmMail: true } });
      // await this.findOneAndUpdate({ mail }, { $set: { codeMail: code } });
      user.isConfirmMail = true;
      user.codeMail = code;
      return user.save();
    } catch (error) {
      throw error;
    }
  }

  async confirmCode(context, code: string) {
    const session = context.session;
    // if (session.mailotp == null) {
    //   console.log('Session is null or undefined');
    // }

    // if (session.mailotp.code === code) {
    //   const user = await this.signUp(session.mailotp);
    //   const mail = user.mail;
    //   await this.findOneAndUpdate({ mail }, { $set: { codeMail: code } });
    // }
    // console.log(session.mailotp);
    if (session.mailotp === undefined) {
      // console.log('Session is null or undefined');
      throw new BadRequestException('OTP đã hết hạn!');
    }
    if (session.mailotp.code != code) {
      throw new BadRequestException('OTP không khớp!');
    }
    const mail = session.mailotp;
    await this.signUp(mail, mail.code);
  }

  async onlyChangePassword(input: ChangePasswordInput) {
    try {
      const { mail, curentPassword, newPassword, reNewPassword } = input;

      const user = await this.getOne({ mail });
      throwIfNotExists(user, 'Tài khoản không tồn tại!');

      await this.isNotCorrectPassword(curentPassword, user.password);

      await this.changePassword(mail, newPassword, reNewPassword);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    mail: string,
    newPassword: string,
    reNewPassword: string,
  ) {
    if (newPassword != reNewPassword) {
      throw new BadRequestException('Mật khẩu đã nhập không khớp!');
    }

    const [user, hashPassword] = await Promise.all([
      this.userModel.findOne({ mail }),
      this.hashPassword(newPassword),
    ]);
    user.password = hashPassword;

    return user.save();
  }
}
