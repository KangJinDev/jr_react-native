export default (database, sequelize) => {
    const { Sequelize, DataTypes } = require('sequelize');

    const LifetimeHistory = database.define('LifetimeHistory', {
        Idx: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        LastUpdatedUTC: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TimeZoneOffset: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Attribute: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Value: {
            type: DataTypes.REAL,
            allowNull: true
        }
    }, {
        // Don't use updatedAt or createdAt columns
        timestamps: false,

        // Don't pluralize table name
        freezeTableName: true
    });

    return LifetimeHistory;
};
