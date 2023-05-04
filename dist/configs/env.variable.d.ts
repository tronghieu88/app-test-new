declare const _default: () => {
    NODE_ENV: string;
    port: number;
    database: {
        local: string;
        onl: string;
    };
    token: {
        JWT_ACCESS_TOKEN_SECRET: string;
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;
        JWT_REFRESH_TOKEN_SECRET: string;
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
    };
    mail: {
        EMAIL_ADDRESS: string;
        EMAIL_HOST: string;
        EMAIL_USERNAME: string;
        EMAIL_PASSWORD: string;
        EMAIL_PORT: number;
        JWT_VERIFICATION_EMAIL_TOKEN_SECRET: string;
        JWT_VERIFICATION_EXPIRATION_TIME: string;
    };
};
export default _default;
