const mongoose = require('mongoose');
const dniValidator = require('../utils/dominicanDniValidator');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A customer must have a name'],
    },
    dni: {
        type: String,
        trim: true,
        // unique: true, // commented to be able to create employees with same dni. just for testing
        required: [true, 'A customer must have a dni'],
        // custom validator of the dominican dni
        validate: [dniValidator.validate, 'Invalid DNI'],
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email'],
    },
    creditCard: {
        type: String,
        trim: true,
        // unique: true,
        validate: [
            validator.isCreditCard,
            'Invalid Credit Card. Please, try again',
        ],
        required: [true, 'A customer must have a credit card'],
    },
    creditLimit: {
        type: Number,
        trim: true,
        required: [true, 'A customer must have a limit on his credit'],
    },
    customerType: {
        type: String,
        enum: ['legal', 'physical'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

// adding some indexes
customerSchema.index({ dni: 1, customerType: 1, email: 1 });

// add a pre on save to save the credit card last digits. the other ones as *
customerSchema.pre('save', function (next) {
    // removes dashes (-)
    const card = this.creditCard.replace(/-/g, '');
    // replace first 12 numbers to *
    starChars = card.substring(0, 12).replace(/[0-9]/g, '*');
    // get lasts 4 digits
    lastDigits = card.slice(12);

    // concat everything and set the value
    this.creditCard = starChars + lastDigits;

    next();
});

const Customer = new mongoose.model('Customer', customerSchema);

module.exports = Customer;
