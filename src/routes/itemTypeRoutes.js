const express = require('express');
const itemTypeController = require('../controllers/itemTypeController');

const router = express.Router();

router
    .route('/')
    .get(itemTypeController.getAllItemTypes)
    .post(itemTypeController.createItemType);

router
    .route('/:id')
    .get(itemTypeController.getOneItemType)
    .patch(itemTypeController.updateItemType)
    .delete(itemTypeController.deleteItemType);

module.exports = router;
