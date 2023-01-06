const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');

async function register(user) {
    const { username, password, repeatPassword } = user;

    //Handle mismatching passwords
    if (password !== repeatPassword) throw new Error('Passwords don\'t match');

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, constants.SALT_ROUNDS);
    const payload = {
        username,
        password: hashedPassword,
    }

    //Create User
    try {
        return await User.create(payload);

    } catch (error) {
        // Handle duplicate username error
        if (error.name === 'MongoServerError' && error.code === 11000) throw new Error('Username already exist');
        throw error
    }
}

async function login(user) {
    const { username, password } = user;

    // Check username and pass
    const existingUser = await User.findOne({ username });
    console.log(existingUser);
    if (existingUser && await bcrypt.compare(password, existingUser.password)) {

        // Sign JWT
        const payload = {
            username: existingUser.username,
            id: existingUser._id
        }
        
        const token = new Promise((resolve, reject) => {
            jwt.sign(payload, constants.JWT_SECRET, {expiresIn:'1d'},(err, token) => {
                if(err) {
                    console.log(err);
                    reject('Something went wrong')
                } else {
                    resolve(token)
                }
            })
        })   

        // return token
        return token;

    } else {
        throw new Error('Username or Password are incorrect')
    }
}


module.exports = {
    register,
    login
}