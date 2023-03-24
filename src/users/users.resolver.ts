import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/user.dto';
import { User, UserResult } from './user.entities';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guard/role.guard';
import { hasRoles } from 'src/constants/roles.deco';
import { RoleEnum } from 'src/constants/enum';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { GetUser } from 'src/decorators/getuser.decorators';

@Resolver()
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
    @Args({ name: 'userInput1', type: () => UserInput }) userInput1: UserInput,
  ): Promise<User> {
    return await this.usersService.create(userInput1);
  }

  @Query(() => UserResult)
  @UseGuards(LoginAccessGuard)
  // @hasRoles(RoleEnum.ADMIN)
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

  @Mutation(() => Boolean)
  async deleteOne(
    @Args({ name: 'Delete', type: () => UserInput, nullable: true })
    Delete: UserInput,
  ): Promise<Boolean> {
    return await this.usersService.deleteOne(Delete);
  }

  @Mutation(() => Boolean)
  async updateOne(
    @Args({ name: 'userName', type: () => String }) userName: string,
    @Args({ name: 'userInput', type: () => UserInput }) userInput: UserInput,
  ): Promise<Boolean> {
    const userNew = await this.usersService.updateOne(userName, userInput);
    return userNew;
  }

  @Query(() => UserResult)
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

  @Query(() => User)
  @UseGuards(LoginAccessGuard)
  getCurrentUser(@GetUser() user: User): User {
    console.log(user);
    return user;
  }
}
