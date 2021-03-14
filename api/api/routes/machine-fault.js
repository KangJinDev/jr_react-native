import express from 'express';

import {getMachineFaults} from '../controllers/machine-fault';

const machineFaultRoutes = express.Router();

machineFaultRoutes.get('/', getMachineFaults);

export default machineFaultRoutes;
