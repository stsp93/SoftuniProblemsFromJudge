const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bookedHotels: [
        {
            type:Types.ObjectId,
            ref:'Hotel'
        }
    ],
    offeredHotels: [
        {
            type:Types.ObjectId,
            ref:'Hotel' 
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