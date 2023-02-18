const { Schema, model, Types } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    email: {
        type: String,
        match: [EMAIL_PATTERN, 'Email is invalid'],
        required: [true, 'Email is required'],
        minLength: [10, 'The email should be at least 10 characters long']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [4, 'The username should be at least 4 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    wishingList: [{
        type: Types.ObjectId,
        ref: 'Book'
    }]
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