const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [4, 'The username should be at least 4 characters long'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        maxLength: [20, 'The address should be a maximum of 20 characters long']
    },
    myPublications: [
        {
            type:Types.ObjectId,
            ref: 'Publication'
        }
    ],
    publicationShared:[
        {
            type:Types.ObjectId,
            ref: 'Publication'
        }
    ],
}, {
    toObject :{
        virtuals:true
    }
})

userSchema.virtual('owned').get(function() {
    return this.myPublications?.map(p => p).join(', ')
})
userSchema.virtual('shared').get(function() {
    return this.publicationShared?.map(p => p).join(', ')
})

userSchema.index({ username: 1 }, {
    name: 'username_idx',
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const User = model('User', userSchema);

module.exports = User;