const { Schema, model, Types } = require('mongoose');
const { EMAIL_PATTERN } = require('../config/constants');

const userSchema = new Schema({
    email: {
        type: String,
        match:[EMAIL_PATTERN, 'Enter valid email'],
        required: [true, 'Email is required'],
        unique: [true, 'Email is already in use']
    },
    firstName: {type:String, required:[true, 'First name is required']},
    lastName: {type:String, required:[true, 'Last name is required']},
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    myPosts: [{
        type: Types.ObjectId,
        ref:'Post'
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