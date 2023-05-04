import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getSession(session: Record<string, any>): Promise<void>;
    verifyEmail(params: any, session: Record<string, any>): Promise<string>;
}
