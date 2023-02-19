const { Schema, model } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    email: {
        type: String,
        match: [EMAIL_PATTERN, 'Email is invalid'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

/*

*/

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