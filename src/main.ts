import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { LoggerService } from './logger/logger.service';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { sessionMiddleware } from './utils/session.middleware';
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const dir = '../../../tmp';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  app.use(cookieParser());

  // app.use(
  //   session({
  //     secret: 'hello',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 2000000 },
  //   }),
  // );
  app.use(sessionMiddleware);
  app.set('trust proxy');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new LoggerService());
  console.log('App running at: ' + port);
  await app.listen(process.env.PORT || port);
}
bootstrap();
