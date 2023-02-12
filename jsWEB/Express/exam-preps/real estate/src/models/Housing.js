const { Schema, model, Types } = require('mongoose');

const housingSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [6, 'The Name should be at least 6 characters'],
        unique: true
    },
    type: {
        type: String,
        enum: {
            values: ['Apartment', 'Villa', 'House'],
            message: 'Type should be Apartment, Villa or House'
        },
        required: [true, 'Type is required'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        validate: {
            validator: (v) => v >= 1850 && v <= 2023,
            message: 'Year should be between 1850 and 2023'
        }
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        minLength: [4, 'The City should be at least 4 characters long']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: [true, 'Image Url is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [60, 'The Property Description should be a maximum of 60 characters long.'],
    },
    availablePieces: {
        type: Number,
        required: [true, 'Available pieces is required'],
        validate: {
            validator: (v) => v >= 0 && v <= 10,
            message: 'The Available Pieces should be positive number (from 0 to 10)'
        }
    },
    createdAt: {
        type:Date,
        default: () => Date.now()
    },
    usersRenting: [
        {
            type: Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
})


housingSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Housing = model('Housing', housingSchema);

module.exports = Housing;