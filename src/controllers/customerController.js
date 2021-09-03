const Customer = require('../models/customer');
const baseController = require('../controllers/baseController');

exports.getAllCustomers = baseController.getAll(Customer);

exports.getOneCustomer = baseController.getOne(Customer);

exports.createCustomer = baseController.createOne(Customer);

exports.updateCustomer = baseController.updateOne(Customer);

exports.deleteCustomer = baseController.deleteOne(Customer);
