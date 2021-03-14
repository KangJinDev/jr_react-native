export default (database, sequelize) => {
    const { Sequelize, DataTypes } = require('sequelize');

    const TimeZoneOffsets = database.define('TimeZoneOffsets', {
        Idx: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        ZoneCode: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        TimeZoneOffset: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        // Don't use updatedAt or createdAt columns
        timestamps: false,
        
        // Don't pluralize table name
        freezeTableName: true
    });

    return TimeZoneOffsets;
};
