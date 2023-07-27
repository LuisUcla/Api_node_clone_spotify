const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Tracks = sequelize.define(
    'tracks',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false // No se permite que sea nulo o null
        },
        album: {
            type: DataTypes.NUMBER
        },
        cover: {
            type: DataTypes.STRING,
        },
        artist_name: { // relacion con tracks
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING,
        },
        artist_nationality: {
            type: DataTypes.STRING,
        },
        duration_start: {
            type: DataTypes.INTEGER,
        },
        artist_end: {
            type: DataTypes.INTEGER,
        },
        mediaId: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true // createdAt, updateAt
    }
    
);

module.exports = Tracks