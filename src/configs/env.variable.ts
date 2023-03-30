export default () => ({
  NODE_ENV: 'dev',
  // NODE_ENV: 'prod',
  port: 3000,
  database: {
    local: 'mongodb://localhost:27017/testnestjsnew',
  },
  token: {
    JWT_ACCESS_TOKEN_SECRET: 'accesssecret',
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: 86400,

    JWT_REFRESH_TOKEN_SECRET: 'refreshsecret',
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: 6000,
  },
  //   database: {
  //     host: process.env.DB_HOST || 'localhost',
  //     port: parseInt(process.env.DB_PORT, 10) || 27017,
  //     username: process.env.DB_USERNAME || 'root',
  //     password: process.env.DB_PASSWORD || 'password',
  //   },
});
