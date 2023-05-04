import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signIn(input: LoginInput): Promise<JwtPayload>;
    signUp(input: RegisterInput, session: any): Promise<boolean>;
    forgotPassword(mail: string, session: any): Promise<boolean>;
    changePassword(session: any, code: string, newPassword: string, reNewPassword: string): Promise<boolean>;
}
