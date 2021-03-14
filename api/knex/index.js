import knex from 'knex';

import settings from '../knexfile.js';

const environment = process.env.NODE_ENV || 'development'
const config = settings[environment];

export const initKnex = knex(config);
