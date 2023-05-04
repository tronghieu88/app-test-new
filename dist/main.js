"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./logger/logger.service");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const fs = require('fs');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const dir = './tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    app.use(cookieParser());
    app.set('trust proxy');
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useLogger(new logger_service_1.LoggerService());
    console.log('App running at: ' + port);
    await app.listen(process.env.PORT || port);
}
bootstrap();
//# sourceMappingURL=main.js.map