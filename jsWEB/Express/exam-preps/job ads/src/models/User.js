const { Schema, model, Types } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    email: {
        type: String,
        match: [EMAIL_PATTERN, 'The email should be in the following format: <name>@<domain>.<extension> '],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    skills: {
        type: String,
        required: [true, 'Description of skills is required'],
        maxLength: [40, 'The description of skills should be a maximum of 40 characters long']
    },
    myAds: [
        {
            type: Types.ObjectId,
            ref: 'Ad'
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