import { ChangePasswordInput, UpdateCurrentUser, UserInput } from './dto/user.dto';
import { User, UserResult } from './entities/user.entities';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    test(): string;
    testMutation(): string;
    createUser(userInput: UserInput): Promise<User>;
    getAllUser(): Promise<UserResult>;
    findOne(findOneUser: string): Promise<User | null>;
    deleteOne(Delete: UserInput): Promise<Boolean>;
    sortUserName(option: number): Promise<UserResult>;
    updateOne(email: string, userInput: UserInput): Promise<Boolean>;
    updateCurrentUser(user: User, updateCurrentUser: UpdateCurrentUser): Promise<Boolean>;
    confirmCode(code: string, session: any): Promise<boolean>;
    getCurrentUser(user: User): User;
    getSession(session: any): Promise<boolean>;
    onlyChangePassword(input: ChangePasswordInput): Promise<boolean>;
}
