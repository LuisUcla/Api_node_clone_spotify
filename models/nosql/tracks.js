const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const TracksSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: 'ERROR_URL'
            }
        },
        artist: {
            name: {
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            type: Number
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    }, 
    {
        timestamps: true, // createdAt, updateAt
        versionKey: false
    }
);


/* 
    Metodo para hacer join o tener relacion con la coleccion storage
*/
TracksSchema.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages', // --> relacion con storage
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        },
        {
            $unwind: '$audio'
        }
    ])
    return joinData;
};

TracksSchema.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'storages', // --> relacion con storage
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        },
        {
            $unwind: '$audio'
        }
        
    ])
    return joinData;
};
// TracksSchema.plugin(mogooseDelete, { overrideMethods: 'all' })  --> para uso de mongoose-delete para eliminacion logica
module.exports = mongoose.model('tracks', TracksSchema) // user: nombre de la coleccion