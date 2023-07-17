const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storages')
const { createItem, getItem, getItems, deleteItem } = require('../controllers/storage');

router.get('/', getItems)

router.get('/:id', validatorGetItem, getItem);

router.put('/:id', validatorGetItem, getItem);

router.delete('/:id', validatorGetItem, deleteItem);

router.post('/', uploadMiddleware.single('myfile'), createItem)

module.exports = router