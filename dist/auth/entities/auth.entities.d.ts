import { IAuthenticateResponse } from '../interfaces/auth.interfaces';
export declare class JwtPayload implements IAuthenticateResponse {
    accessToken: string;
    refreshToken: string;
}
export declare class IJwtPayload {
    _id?: string;
    userName: string;
}
export declare class UserOTP {
    mail: string;
    code: number;
}
