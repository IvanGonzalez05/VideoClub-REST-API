const express = require('express');
const rentAndReturnController = require('../controllers/rentAndReturnController');

const router = express.Router();

router
    .route('/')
    .get(rentAndReturnController.getAllRents)
    .post(rentAndReturnController.createRent);

router
    .route('/:id')
    .get(rentAndReturnController.getOneRent)
    .patch(rentAndReturnController.updateRent)
    .delete(rentAndReturnController.deleteRent);

module.exports = router;
