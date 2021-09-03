const mongoose = require('mongoose');
const dniValidator = require('../utils/dominicanDniValidator');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'An employee must have a name'],
    },
    dni: {
        type: String,
        trim: true,
        required: [true, 'An employee must have a dni'],
        // custom validator of the dominican dni
        validate: [dniValidator.validate, 'Invalid DNI'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'An employee must have a email'],
        validate: [validator.isEmail, 'Email is not valid'],
    },
    workShift: {
        type: String,
        trim: true,
        enum: ['morning', 'evening', 'overnight'],
        required: [true, 'An employee needs a work shift'],
    },
    commission: String,
    admissionDate: {
        type: Date,
        default: Date.now(),
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});
// adding some indexes
employeeSchema.index({ dni: 1, workShift: 1, email: 1 });

const Employee = new mongoose.model('Employee', employeeSchema);

module.exports = Employee;
