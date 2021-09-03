const mongoose = require('mongoose');

// would be cool to add like an 'amount' prop
// and reduce it every time an item is rented
// and increase it every time an item is returned
// gotta see how to do it, but when the api is finished

const arrayIsNotEmpty = (arr) => {
    return arr.length > 0;
};

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'An item must have a title'],
    },
    itemType: {
        type: mongoose.Schema.ObjectId,
        ref: 'ItemType',
        required: [true, 'An item must belong to an Item Type'],
    },
    genre: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Genre',
            },
        ],
        required: [true, 'An item must belong to a Genre'],
    },
    languages: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Language',
            },
        ],
        validate: [arrayIsNotEmpty, 'An item must have at least 1 language'],
    },
    cast: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Actor',
                required: [true, 'An Item must have a cast'],
            },
        ],
        validate: [arrayIsNotEmpty, 'An Item must have a cast'],
    },
    directors: {
        type: [
            {
                type: String,
                trim: true,
                required: [true, 'An Item must have at least one director'],
            },
        ],
        validate: [arrayIsNotEmpty, 'An Item must have at least one director'],
    },
    rentPerDay: {
        type: Number,
        required: [true, 'An item must have a rent per day fee'],
    },
    amountDaysPerRent: {
        type: Number,
        default: 3, // default to 3 days
    },
    lateDeliveryAmount: Number,
    // quantity: {
    //     type: Number,
    //     required: [true, 'Please provide a quantity for this item'],
    //     validate: {
    //         validator: function (val) {
    //             return val >= 0;
    //         },
    //         message: 'An item cannot have a quantity less than zero',
    //     },
    // },
    status: {
        type: String,
        default: 'available',
        enum: ['available', 'unactive', 'rented'],
    },
});

// adding some indexes
itemSchema.index({ title: 1, itemType: 1, genre: 1 });

itemSchema.pre('find', function (next) {
    // 'this' points to the query, not the current doc
    // this will bring all doc where isActive is Not Equal to false
    this.find({ status: { $nin: ['unactive', 'rented'] } })
        .populate({ path: 'languages', select: 'description' })
        .populate({ path: 'cast', select: 'name' })
        .populate({ path: 'itemType', select: 'description' })
        .populate({ path: 'genre', select: 'description' });
    next();
});

itemSchema.pre('save', function (next) {
    // 'this' points to the current document
    this.lateDeliveryAmount = this.amountDaysPerRent * 2;
    next();
});

const Item = new mongoose.model('Item', itemSchema);

module.exports = Item;
