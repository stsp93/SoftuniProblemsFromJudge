const bcrypt = require('bcrypt');
const { User } = require('../models/User');

async function register(user) {
    const {username, password, repeatPassword} = user;

    //Handle mismatching passwords
    if(password !== repeatPassword) throw new Error('Passwords don\'t match');

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
        username,
        password: hashedPassword,
    }

    //Create User
    try {
        return await User.create(payload);
    } catch (error) { 
        // Handle duplicate username error
        if(error.name === 'MongoServerError' && error.code === 11000) throw new Error('Username already exist');
        throw error
    }
}

module.exports = {
    register
}