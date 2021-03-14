import express from 'express';

import {environment} from '../../config';
import {
    setWiFiCredentials,
    getWiFiConnectStatus,
    getWiFiNetworks,
    mockSetWiFiCredentials,
    mockGetWiFiConnectStatus,
    mockGetWiFiNetworks,
} from '../controllers/wifi';

const reportRoutes = express.Router();

if (environment === 'development') {
    reportRoutes.put('/connect', mockSetWiFiCredentials);
    reportRoutes.get('/status', mockGetWiFiConnectStatus);
    reportRoutes.get('/scan', mockGetWiFiNetworks);
} else {
    reportRoutes.put('/connect', setWiFiCredentials);
    reportRoutes.get('/status', getWiFiConnectStatus);
    reportRoutes.get('/scan', getWiFiNetworks);
}

export default reportRoutes;
