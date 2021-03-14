export default (database, sequelize) => {
    const { Sequelize, DataTypes } = require('sequelize');

    const ProductionData = database.define('ProductionData', {
        Idx: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        UTCDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TimeZoneOffset: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PizzaType: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SauceTime: {
            type: DataTypes.REAL,
            allowNull: true
        },
        ChzTime: {
            type: DataTypes.REAL,
            allowNull: true
        },
        PepTime: {
            type: DataTypes.REAL,
            allowNull: true
        },
        IndexTime: {
            type: DataTypes.REAL,
            allowNull: true
        },
        ChzWeight: {
            type: DataTypes.REAL,
            allowNull: true
        }
    }, {
        // Don't use updatedAt or createdAt columns
        timestamps: false,

        // Don't pluralize table name
        freezeTableName: true
    });

    return ProductionData;
};
