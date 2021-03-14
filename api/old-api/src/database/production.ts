const Sequelize = require("sequelize");
import lifetimeHistoryFactory from "../models/lifetimehistory.model"
import cheeseTrendFactory from "../models/cheesetrend.model"
import cleaningHistoryFactory from "../models/cleaninghistory.model"
import productionDataFactory from "../models/productiondata.model"

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite',
    logging: false
});

const prodDatabase = {
    sequelize: Sequelize,
    database: database,
    lifetimeHistory: lifetimeHistoryFactory(database, Sequelize),
    cheeseTrend: cheeseTrendFactory(database, Sequelize),
    cleaningHistory: cleaningHistoryFactory(database, Sequelize),
    productionData: productionDataFactory(database, Sequelize)
};

export default prodDatabase
