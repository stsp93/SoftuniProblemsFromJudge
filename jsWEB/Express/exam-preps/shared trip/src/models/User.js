const { Schema, model, Types } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [EMAIL_PATTERN, 'The email should be in the following format "username@domain.bg']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    gender: {
        type:String,
        enum: {
            values:['male', 'female'],
            message: 'Gender should be male or female'
        },
        required:[true, 'Gender is required']
    },
    tripsHistory: [
        {
            type: Types.ObjectId,
            ref: 'Trip'
        }
    ],
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