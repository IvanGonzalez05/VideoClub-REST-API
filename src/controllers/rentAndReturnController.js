const RentAndReturn = require('../models/rentAndReturn');
const baseController = require('../controllers/baseController');

exports.getAllRents = baseController.getAll(RentAndReturn);

exports.getOneRent = baseController.getOne(RentAndReturn);

exports.createRent = baseController.createOne(RentAndReturn);

exports.updateRent = baseController.updateOne(RentAndReturn);

exports.deleteRent = baseController.deleteOne(RentAndReturn);
