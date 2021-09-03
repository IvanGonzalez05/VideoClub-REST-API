const mongoose = require('mongoose');

const itemTypeSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: [true, 'An item type must have a description'],
        minlength: [2, 'An item type can not be smaller than 2 characters'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

itemTypeSchema.pre('find', function (next) {
    // 'this' points to the query, not the current doc
    // this will bring all doc where isActive is Not Equal to false
    this.find({ isActive: { $ne: false } });
    next();
});

const ItemType = mongoose.model('ItemType', itemTypeSchema);

module.exports = ItemType;
