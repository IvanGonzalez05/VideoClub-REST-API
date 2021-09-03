const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, 'A genre must have a description'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

genreSchema.pre('find', function (next) {
    // 'this' points to the query, not the current doc
    // this will bring all doc where isActive is Not Equal to false
    this.find({ isActive: { $ne: false } });
    next();
});

const Genre = new mongoose.model('Genre', genreSchema);

module.exports = Genre;
