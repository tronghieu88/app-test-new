import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
// mongoose.set('debug', process.env.NODE_ENV === 'prod' ? false : true);

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  setMongooseConfig() {
    console.log(this.configService.get<string>('database.onl'));
    const debug =
      this.configService.get<string>('NODE_ENV') === 'prod' ? false : true;
    mongoose.set('debug', debug);
  }

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    this.setMongooseConfig();
    return {
      // uri: 'mongodb://localhost:27017/testlocal',
      uri: this.configService.get<string>('database.onl'),
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    };
  }
}
