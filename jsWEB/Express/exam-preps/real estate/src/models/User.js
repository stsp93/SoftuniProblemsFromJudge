const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: [(/^[A-Za-z]+\s[A-Za-z]+$/i), 'The name should be in the following format -> (firstname lastname) - "Alexandur Petrov']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'The username should be at least 5 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})


userSchema.index({ username: 1 }, {
    name: 'username_idx',
    unique: true,
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const User = model('User', userSchema);

module.exports = User;