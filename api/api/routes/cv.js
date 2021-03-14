import express from 'express';

import {auth, log} from '../controllers/cv';

const routes = express.Router();

routes.post('/auth', auth);
routes.post('/log', log);

export default routes;
