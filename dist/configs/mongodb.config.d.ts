import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
export declare class MongooseConfigService implements MongooseOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    setMongooseConfig(): void;
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
