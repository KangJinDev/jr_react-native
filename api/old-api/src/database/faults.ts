const Sequelize = require("sequelize");
import faultsFactory from "../models/faults.model"

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db/machinefaults.sqlite',
    logging: false
});

const db = {
    sequelize: Sequelize,
    database: database,
    faults: faultsFactory(database, Sequelize)
};

export default db
