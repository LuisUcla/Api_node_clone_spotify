const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Storage = sequelize.define(
    'storage',
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false // No se permite que sea nulo o null
        },
        filename: {
            type: DataTypes.STRING
        },
    },
    {
        timestamps: true // createdAt, updateAt
    }
    
);

module.exports = Storage