const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, JWT_SECRET } = require('../config/constants');
const { promisify } = require('util');

const verifyTokenAsync = promisify(jwt.verify)

const blacklist = new Set();
blacklist.add('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpZCI6IjYzYjcyYjhkZDY2NThiZmEyMDM0N2QyOCIsImlhdCI6MTY3MzAxMTgwNywiZXhwIjoxNjczMDk4MjA3fQ.pDOiXPDukWryctJNaWA_EEm1g6TAxYtaGexwSy1wm1k');


async function register(user) {
    const { username, password, repeatPassword } = user;

    //Handle mismatching passwords
    if (password !== repeatPassword) throw new Error('Passwords don\'t match');

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
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
    if (existingUser && await bcrypt.compare(password, existingUser.password)) {

        // Sign JWT
        const payload = {
            username: existingUser.username,
            id: existingUser._id
        }

        const token = new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                if (err) {
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

async function logout(token) {
    blacklist.add(token)

}

const verifyToken = async (token) => {
    if (!blacklist.has(token)) {
        return await verifyTokenAsync(token, JWT_SECRET);
    } else {
        throw new Error('Token is blacklisted');
    }
}




module.exports = {
    register,
    login,
    verifyToken,
    logout
}