const Item = require('../models/item');
const baseController = require('./baseController');

exports.getAllItems = baseController.getAll(Item);

exports.getOneItem = baseController.getOne(Item);

exports.createItem = baseController.createOne(Item);

exports.updateItem = baseController.updateOne(Item);

exports.deleteItem = baseController.deleteOne(Item);
