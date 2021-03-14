import express from 'express';

import {getProductionData} from '../controllers/production-data';

const productionDataRoutes = express.Router();

productionDataRoutes.get('/', getProductionData);

export default productionDataRoutes;
