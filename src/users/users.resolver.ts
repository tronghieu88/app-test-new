import { Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Error } from 'mongoose';
import { UserInput } from './dto/user.dto';
import { User, UserResult } from './user.entities';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  test() {
    return 'Test users';
  }
  @Mutation(() => String)
  testMutation() {
    return 'Test mutation';
  }
  @Mutation(() => User)
  async createUser(
    @Args({ name: 'userInput1', type: () => UserInput }) userInput1: UserInput,
  ): Promise<User> {
    return await this.usersService.create(userInput1);
  }

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
    console.log(userfind);

    return userfind;
  }

  @Mutation(() => Boolean)
  async deleteOne(
    @Args({ name: 'Delete', type: () => UserInput, nullable: true })
    Delete: UserInput,
  ): Promise<Boolean> {
    return await this.usersService.deleteOne(Delete);
  }
}
