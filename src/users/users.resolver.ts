import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UpdateCurrentUser, UserInput } from './dto/user.dto';
import { User, UserOTP, UserResult } from './entities/user.entities';
import { UsersService } from './users.service';

import { ExecutionContext, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guard/role.guard';
import { hasRoles } from 'src/constants/roles.deco';
import { RoleEnum } from 'src/constants/enum';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { GetUser } from 'src/decorators/getuser.decorators';
import { Session } from 'src/decorators/session.decorator';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  test() {
    return 'Khong thay doi du lieu';
  }

  @Mutation(() => String)
  testMutation() {
    return 'Thay doi du lieu';
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'userInput', type: () => UserInput }) userInput: UserInput,
  ): Promise<User> {
    return await this.usersService.create(userInput);
  }

  // @hasRoles(RoleEnum.ADMIN)
  @Query(() => UserResult)
  async getAllUser(): Promise<UserResult> {
    return await this.usersService.getAll();
  }

  @Query(() => User)
  async findOne(
    @Args({ name: 'findOneUser', type: () => String, nullable: true })
    findOneUser: string,
  ): Promise<User | null> {
    const userfind = await this.usersService.findOne(findOneUser);
    // console.log(userfind);

    return userfind;
  }

  @UseGuards(LoginAccessGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async deleteOne(
    @Args({ name: 'Delete', type: () => UserInput, nullable: true })
    Delete: UserInput,
  ): Promise<Boolean> {
    return await this.usersService.deleteOne(Delete);
  }

  @Query(() => UserResult)
  @UseGuards(LoginAccessGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN, RoleEnum.USER)
  async sortUserName(
    @Args({
      name: 'option',
      type: () => Number,
      description: 'Sort A-Z: 1 \nSort Z-A: -1',
    })
    option: number,
  ): Promise<UserResult> {
    return await this.usersService.getAllAndSortUserName(option);
  }

  @Mutation(() => Boolean)
  async updateOne(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'userInput', type: () => UserInput }) userInput: UserInput,
  ): Promise<Boolean> {
    const userNew = await this.usersService.updateOne(email, userInput);
    return userNew;
  }

  @UseGuards(LoginAccessGuard)
  @Mutation(() => Boolean)
  async updateCurrentUser(
    @GetUser() user: User,
    @Args({ name: 'updateCurrentUser', type: () => UpdateCurrentUser })
    updateCurrentUser: UpdateCurrentUser,
  ): Promise<Boolean> {
    // console.log(user);
    const userNew = await this.usersService.updateCurrentUser(
      user,
      updateCurrentUser,
    );
    return userNew;
  }

  // @UseGuards(LocalAccessGuard)
  @Mutation(() => Boolean)
  async confirmCode(
    @Args({ name: 'code', type: () => String }) code: string,
    @Session() session,
  ) {
    await this.usersService.confirmCode(session, code);
    return true;
  }

  @Query(() => User)
  @UseGuards(LoginAccessGuard)
  getCurrentUser(@GetUser() user: User): User {
    // console.log(user);
    return user;
  }

  // @UseGuards(LocalAccessGuard)
  @Query(() => Boolean)
  async getSession(@Session() session) {
    // const { req } = context;
    // const session = context.req.session;
    // console.log(session);
    // req.session.additionalData = 'additional data';
    // return true;
    console.log('---------------');
    console.log(session.session);
    return true;
  }
}
