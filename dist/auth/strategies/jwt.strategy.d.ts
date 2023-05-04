import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entities';
import { UsersService } from 'src/users/users.service';
import { IJwtPayload } from '../entities/auth.entities';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private configService;
    constructor(userService: UsersService, configService: ConfigService);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
