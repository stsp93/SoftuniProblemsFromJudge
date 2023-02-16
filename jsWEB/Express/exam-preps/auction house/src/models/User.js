const { Schema, model } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    email: {
        type: String,
        match: [EMAIL_PATTERN, 'Email is invalid'],
        required: [true, 'Email is required'],
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [1, 'First Name should be at least 1 char long']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [1, 'Last Name should be at least 1 char long']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    closedAuctions: [
        {
        title: String,
        imageUrl: String,
        price:Number,
        bidder:String

    }
]
})



userSchema.index({ email: 1 }, {
    name: 'email_idx',
    unique: true,
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const User = model('User', userSchema);

module.exports = User;