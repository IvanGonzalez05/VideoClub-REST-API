const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'An actor must have a name'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

actorSchema.pre('find', function (next) {
    // 'this' points to the query, not the current doc
    // this will bring all doc where isActive is Not Equal to false
    this.find({ isActive: { $ne: false } });
    next();
});

const Actor = new mongoose.model('Actor', actorSchema);

module.exports = Actor;
