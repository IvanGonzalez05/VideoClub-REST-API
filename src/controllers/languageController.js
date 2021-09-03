const baseController = require('./baseController');
const Language = require('../models/language');

exports.getAllLanguages = baseController.getAll(Language);

exports.getOneLanguage = baseController.getOne(Language);

exports.createLanguage = baseController.createOne(Language);

exports.updateLanguage = baseController.updateOne(Language);

exports.deleteLanguage = baseController.deleteOne(Language);
