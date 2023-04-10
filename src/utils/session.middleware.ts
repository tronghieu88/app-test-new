import * as session from 'express-session';

export const sessionMiddleware = session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2000000 },
});
