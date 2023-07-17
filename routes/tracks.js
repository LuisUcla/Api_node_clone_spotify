const express = require('express')
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks')
const router = express.Router()

router.get('/', getItems); // lista de items

router.post('/', validatorCreateItem, createItem) // crear item

router.get('/:id', validatorGetItem, getItem)

router.put('/:id', validatorGetItem, validatorCreateItem, updateItem) // se usan dos middleware para validar el id y la data

router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router