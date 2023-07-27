const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const getItems = async (req, res) => {
    try {
        const user = req.user; // datos del usuario que hace la peticion
        const data = await tracksModel.findAllData({});
        res.send({ data, user }) // se envia los datos del usuario
    } catch (e) {
        handleHttpError(res, "Error_get_items")
    }
}

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findOneData(id);
        res.send({ data })
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_GET_ITEM")
    }

}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) // matchedData: limpia los datos en caso de que vengan datos demas
        const data = await tracksModel.create(body)
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "Error_create_item")
    }
}

const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req) // matchedData: limpia los datos en caso de que vengan datos demas
        const data = await tracksModel.findByIdAndUpdate(id, body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "Error_update_item_tracks")
    }
}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.deleteOne({_id: id}); // deleteOne elimina de forma fisica
        /* 
            cuando se use eliminacion logica debe ser con 'tracksModel.delete'
        */
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }