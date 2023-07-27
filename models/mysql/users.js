const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false // No se permite que sea nulo o null
        },
        age: {
            type: DataTypes.NUMBER
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM(['user', 'admin'])
        }
    },
    {
        timestamps: true // createdAt, updateAt
    }
    
);

module.exports = User