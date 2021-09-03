const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, 'A language must have a description'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

languageSchema.pre('find', function (next) {
    // 'this' points to the query, not the current doc
    // this will bring all doc where isActive is Not Equal to false
    this.find({ isActive: { $ne: false } });
    next();
});

const Language = new mongoose.model('Language', languageSchema);

module.exports = Language;
