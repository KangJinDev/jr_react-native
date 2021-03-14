export default (database, sequelize) => {
    const { Sequelize, DataTypes } = require('sequelize');

    const CleaningHistory = database.define('CleaningHistory', {
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
        CleaningZone: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        // Don't use updatedAt or createdAt columns
        timestamps: false,

        // Don't pluralize table name
        freezeTableName: true
    });

    return CleaningHistory;
};
