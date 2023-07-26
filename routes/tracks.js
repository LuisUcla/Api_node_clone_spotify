const express = require('express')
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks');
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
const router = express.Router()

router.get('/', authMiddleware, getItems); // lista de items con middleware de inicio de sesion

router.post('/', authMiddleware, checkRol(['admin']), validatorCreateItem, createItem) // crear item

router.get('/:id',authMiddleware, validatorGetItem, getItem)

router.put('/:id',authMiddleware, validatorGetItem, validatorCreateItem, updateItem) // se usan dos middleware para validar el id y la data

router.delete('/:id',authMiddleware, validatorGetItem, deleteItem)

module.exports = router