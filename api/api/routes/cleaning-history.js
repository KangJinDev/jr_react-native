import express from 'express';

import {getCleaningHistories, getLatestTimestamp} from '../controllers/cleaning-history';

const cleaningHistoryRoutes = express.Router();

cleaningHistoryRoutes.get('/', getCleaningHistories);
cleaningHistoryRoutes.get('/latest', getLatestTimestamp);

export default cleaningHistoryRoutes;
