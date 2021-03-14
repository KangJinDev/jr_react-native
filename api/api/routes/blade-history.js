import express from 'express';

import {getBladeHistories} from '../controllers/blade-history';

const bladeHistoryRoutes = express.Router();

bladeHistoryRoutes.get('/', getBladeHistories);

export default bladeHistoryRoutes;
