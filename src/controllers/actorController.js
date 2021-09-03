const Actor = require('../models/actor');
const baseController = require('./baseController');

exports.getAllActors = baseController.getAll(Actor);

exports.getOneActor = baseController.getOne(Actor);

exports.createActor = baseController.createOne(Actor);

exports.updateActor = baseController.updateOne(Actor);

exports.deleteActor = baseController.deleteOne(Actor);
