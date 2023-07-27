const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Storage = require('./storage')

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

/* 
IMPLEMENTANDO MODELO PERSONALIZADO
*/

Tracks.findAllData = function() { // busqueda de todos los valores
    Tracks.belongsTo(Storage, { // relacion de 1 a muchos: 1 storage esta en 1 o muchos Tracks
        foreignKey: 'mediaId',
        as: 'audio'
    })

    return Tracks.findAll({ include: 'audio' })
};

Tracks.findOneData = function(id) { // busqueda de un solo valor
    Tracks.belongsTo(Storage, { // relacion de 1 a muchos: 1 storage esta en 1 o muchos Tracks
        foreignKey: 'mediaId',
        as: 'audio'
    })

    return Tracks.findOne({where: { id }, include: 'audio' })
};

module.exports = Tracks