export default (database, sequelize) => {
    const { Sequelize, DataTypes } = require('sequelize');

    const Faults = database.define('Faults', {
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
        FaultCode: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        // Don't use updatedAt or createdAt columns
        timestamps: false,

        // Don't pluralize table name
        freezeTableName: true
    });

    return Faults;
};
