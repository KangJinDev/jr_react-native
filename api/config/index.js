import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const environment = process.env.NODE_ENV;

const devConfig = {
    port: process.env.PORT,
    wifiConfigService: process.env.WIFI_CONFIG_SERVICE,
    plcBaseUrl: process.env.PLC_SERVER_URL,
    cvBaseUrl: process.env.CAESAR_VISION_SERVICE,
    cronTimeConfig: '0 0 */1 * * *',
    configFile: path.join('./db', 'config.json'),
    pinFile: path.join('./db', 'onboard-pin'),
}

const prodConfig = {
    port: process.env.PORT,
    wifiConfigService: process.env.WIFI_CONFIG_SERVICE,
    plcBaseUrl: process.env.PLC_SERVER_URL,
    cvBaseUrl: process.env.CAESAR_VISION_SERVICE,
    cronTimeConfig: '*/5 * * * * *',
    configFile: path.join(process.env.PROD_DATA_PATH, 'config.json'),
    pinFile: path.join(process.env.PROD_DATA_PATH, 'onboard-pin'),
}

const appConfig = environment === 'development' ? devConfig : prodConfig;

export default appConfig;
