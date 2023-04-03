import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { LoggerService } from './logger/logger.service';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new LoggerService());
  console.log('App running at: ' + port);
  await app.listen(port);
}
bootstrap();
