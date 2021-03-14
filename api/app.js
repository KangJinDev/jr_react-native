import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import appConfig, {environment} from './config';
import initializeAppRoutes from './api/routes';
import {mockInitializeCronJob} from './scheduler/mock';
import {initializeCronJob} from './scheduler';
import { base, file } from "paths.macro";
import { createLogger } from "./logger";
const logger = createLogger(base, file);

const port = appConfig.port || 4000;
const pinoLogger = require('express-pino-logger')({
  logger
})
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use(pinoLogger);

initializeAppRoutes(app);

if (environment === 'development') {
	mockInitializeCronJob();
} else {
	initializeCronJob();
}

app.listen(port, () => {
	console.log('Listening on port: ' + port);
})
