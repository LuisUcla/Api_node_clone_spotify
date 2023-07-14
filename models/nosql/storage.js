const mongoose = require('mongoose')

const StorageSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        },
       
    }, 
    {
        timestamps: true, // createdAt, updateAt
        versionKey: false
    }
)

module.exports = mongoose.model('storage', StorageSchema) // user: nombre de la coleccion en la base de datos