import express from 'express';

import {environment} from '../../config';
import {getAppStatus, mockGetAppStatus} from '../controllers/app';
import {configureApp, getConfig} from '../controllers/config';

const appStatusRoutes = express.Router();

if (environment === 'development') {
    appStatusRoutes.get('/status', mockGetAppStatus);
} else {
    appStatusRoutes.get('/status', getAppStatus);
}

appStatusRoutes.put('/config', configureApp);
appStatusRoutes.get('/config', getConfig);

export default appStatusRoutes;
