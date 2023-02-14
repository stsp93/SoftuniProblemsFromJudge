const { Schema, model, Types } = require('mongoose');

const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: [true, 'Start Point is required'],
        minLength: [4, 'Start Point should be at least 4 characters long']
    },
    endPoint: {
        type: String,
        required: [true, 'End Point is required'],
        minLength: [4, 'End Point should be at least 4 characters long']
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    carImage: {
        type: String,
        match: [/^https?:\/\//, 'Invalid Car image URL'],
        required: [true, 'Car image is required'],
    },
    carBrand: {
        type: String,
        required: [true, 'Car Brand is required'],
        minLength: [4, 'The Car Brand should be minimum 4 characters long']
    },
    seats: {
        type: Number,
        required: [true, 'Seats is required'],
        validate: {
            validator: (value) => value >= 0 && value <= 4,
            message: 'The Seats should be positive number (from 0 to 4 inclusive)'
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value >= 1 && value <= 50,
            message: 'The Price should be positive number (from 1 to 50 inclusive)'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'The Description should be minimum 10 characters long']
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },
    buddies: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
})


const Trip = model('Trip', tripSchema);

module.exports = Trip;