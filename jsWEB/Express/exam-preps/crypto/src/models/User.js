const { Schema, model } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'The username should be at least 5 characters long']
    },
    email: {
        type: String,
        match: [EMAIL_PATTERN,'Email is invalid'],
        minLength:[10, 'The email should be at least 10 character long'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
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