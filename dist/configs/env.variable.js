"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    NODE_ENV: 'dev',
    port: 3000,
    database: {
        local: 'mongodb://localhost:27017/testnestjsnew',
        onl: 'mongodb+srv://ngthieu88:v1UrZrOqxppV7jFH@cluster0.mearxrw.mongodb.net/app-test-new?retryWrites=true&w=majority',
    },
    token: {
        JWT_ACCESS_TOKEN_SECRET: 'accesssecret',
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: 86400,
        JWT_REFRESH_TOKEN_SECRET: 'refreshsecret',
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: 6000,
    },
    mail: {
        EMAIL_ADDRESS: 'Trong Hieu <hieu@gmail.com>',
        EMAIL_HOST: 'smtp.mailtrap.io',
        EMAIL_USERNAME: '71e064d69635dc',
        EMAIL_PASSWORD: 'b59a4f6c1e9c80',
        EMAIL_PORT: 25,
        JWT_VERIFICATION_EMAIL_TOKEN_SECRET: 'hahahaha',
        JWT_VERIFICATION_EXPIRATION_TIME: '86400',
    },
});
//# sourceMappingURL=env.variable.js.map