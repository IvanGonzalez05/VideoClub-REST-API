const mongoose = require('mongoose');
const Item = require('../models/item');

const rentAndReturnSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee',
        required: [true, 'A rent must be made by an employee'],
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: [true, 'A rent must have an item'],
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: [true, 'A rent needs a customer'],
    },
    rentDate: {
        type: Date,
        default: Date.now(),
    },
    rentDays: {
        type: Number,
        required: [
            true,
            'Need to specify how many days the rent is going to last',
        ],
    },
    returnDate: Date,
    amountPerDay: Number,
    totalAmount: Number,
    comment: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

// adding some indexes
rentAndReturnSchema.index({ employee: 1, customer: 1, rentDate: 1 });

rentAndReturnSchema.pre(/^find/, function (next) {
    // 'this' points to the query, not the current doc
    // this will bring all doc where isActive is Not Equal to false
    this.find({ isActive: { $ne: false } })
        .populate({
            path: 'item',
            select: '-languages -genre -cast -itemType -directors -rentPerDay -amountDaysPerRent -lateDeliveryAmount -status -__v',
        })
        .populate({ path: 'employee', select: 'name' })
        .populate({ path: 'customer', select: 'name' });
    next();
});

rentAndReturnSchema.pre('save', async function (next) {
    // 'this' points to the current doc
    this.returnDate = this.rentDate + this.rentDays * 24 * 60 * 60 * 1000;

    const item = await Item.findByIdAndUpdate(
        this.item,
        { status: 'rented' },
        { runValidators: true }
    );
    this.amountPerDay = item.rentPerDay;
    this.totalAmount = item.rentPerDay * this.rentDays;

    next();
});

const RentAndReturn = new mongoose.model(
    'RentsAndReturns',
    rentAndReturnSchema
);

module.exports = RentAndReturn;
