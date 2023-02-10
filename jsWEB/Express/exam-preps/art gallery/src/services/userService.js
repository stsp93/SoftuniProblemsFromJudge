const { SALT_ROUNDS } = require("../config/constants");
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { signJWT, blacklist } = require("../utils/jwtUtils");
const { handleMongooseError } = require("../utils/errorUtils");


async function register(user) {
    const { username, password, rePassword, address } = user;

    //Handle mismatching passwords
    if (!password) throw new Error('Password is required');
    if (password.length <3) throw new Error('Password should be at least 3 characters long');
    if (password !== rePassword) throw new Error('Passwords don\'t match');

    //Hash Password
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const payload = {
        username,
        password: hashedPassword,
        address
    }

    try {
        //Create User
        const newUser = await User.create(payload);

        // Login (Sign and return JWT )
        return await signJWT(newUser.username,newUser.address, newUser._id)

    } catch (error) {
        console.log(error);
        handleMongooseError(error);
    }
}

async function login(user) {
    const { username, password, address } = user;

    // Check username and pass
    const existingUser = await User.findOne({ username });
    if (!existingUser || !await bcrypt.compare(password, existingUser.password)) { 
        throw new Error('Username or Password are incorrect') 
    }

    try {
        return await signJWT(existingUser.username,existingUser.address, existingUser._id)
    } catch(err) {
        console.log(err);
    }
    // Sign and return JWT
}


async function logout(token) {
    blacklist.add(token)
}

async function getUserPublications(userId) {
    return await User.findById(userId).populate('myPublications', 'title').populate('publicationShared', 'title')
}

module.exports = {
    register,
    login,
    logout,
    getUserPublications,
}