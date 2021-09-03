const Employee = require('../models/employee');
const baseController = require('../controllers/baseController');

exports.getAllEmployees = baseController.getAll(Employee);

exports.getOneEmployee = baseController.getOne(Employee);

exports.createEmployee = baseController.createOne(Employee);

exports.updateEmployee = baseController.updateOne(Employee);

exports.deleteEmployee = baseController.deleteOne(Employee);
