import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
}
