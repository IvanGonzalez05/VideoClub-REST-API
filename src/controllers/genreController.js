const Genre = require('../models/genre');
const baseController = require('./baseController');

exports.getAllGenres = baseController.getAll(Genre);

exports.getOneGenre = baseController.getOne(Genre);

exports.createGenre = baseController.createOne(Genre);

exports.updateGenre = baseController.updateOne(Genre);

exports.deleteGenre = baseController.deleteOne(Genre);
