import express from 'express';

import {getCheeseTrends} from '../controllers/cheese-trend';

const cheeseTrendRoutes = express.Router();

cheeseTrendRoutes.get('/', getCheeseTrends);

export default cheeseTrendRoutes;
