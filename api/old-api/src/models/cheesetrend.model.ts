export default (database, sequelize) => {
    const { Sequelize, DataTypes } = require('sequelize');

    const CheeseTrend = database.define('CheeseTrend', {
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
        Weight: {
            type: DataTypes.REAL,
            allowNull: true
        },
        PrefillDropWeight: {
            type: DataTypes.REAL,
            allowNull: true
        },
        PrefillTime: {
            type: DataTypes.REAL,
            allowNull: true
        }
    }, {
        // Don't use updatedAt or createdAt columns
        timestamps: false,

        // Don't pluralize table name
        freezeTableName: true
    });
    return CheeseTrend;
};
