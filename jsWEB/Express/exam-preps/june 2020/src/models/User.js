const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username should be at least 3 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    likedPlays: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Play'
        }
    ]
})


const User = model('User', userSchema);

exports.User = User;