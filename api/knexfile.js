const path = require('path');

require('dotenv').config();

const filename = path.resolve(
    path.relative(
        './',
        process.env.NODE_ENV === 'development'
            ? './db'
            : process.env.PROD_DATA_PATH
    ),
    'data.sqlite3'
);

module.exports = {
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename,
    },
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds'
    }
  },
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename,
    },
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds'
    }
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename,
    },
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds'
    }
  }
}
