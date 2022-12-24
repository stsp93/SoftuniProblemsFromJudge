const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required: true
    },
    hash: {
        type:String,
        reqired: true
    }
})

const User = model('User', userSchema);

exports.User = User;