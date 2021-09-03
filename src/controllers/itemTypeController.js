const ItemType = require('../models/itemType');
const baseController = require('./baseController');

exports.getAllItemTypes = baseController.getAll(ItemType);

exports.getOneItemType = baseController.getOne(ItemType);

exports.createItemType = baseController.createOne(ItemType);

exports.updateItemType = baseController.updateOne(ItemType);

exports.deleteItemType = baseController.deleteOne(ItemType);
