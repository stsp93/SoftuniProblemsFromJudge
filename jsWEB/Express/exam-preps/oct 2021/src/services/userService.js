const { SALT_ROUNDS } = require("../config/constants");
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { signJWT, blacklist } = require("../utils/jwtUtils");
const { handleMongooseError } = require("../utils/errorUtils");


async function register(user) {
    const { email, password, rePassword, firstName, lastName } = user;

    //Handle mismatching passwords
    if (!password) throw new Error('Password is required');
    if (password !== rePassword) throw new Error('Passwords don\'t match');

    //Hash Password
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const payload = {
        email,
        password: hashedPassword,
        firstName,
        lastName
    }

    try {
        //Create User
        const newUser = await User.create(payload);

        // Login (Sign and return JWT )
        return await signJWT(`${newUser.firstName} ${newUser.lastName}`, newUser._id)

    } catch (error) {
        console.log(error);
        handleMongooseError(error);
    }
}

async function login(user) {
    const { email, password } = user;

    // Check email and pass
    const existingUser = await User.findOne({ email }).collation({locale:'en', strength:2});
    console.log(await User.findOne({ email }).collation({locale:'en', strength:2}).explain());
    if (!existingUser || !await bcrypt.compare(password, existingUser.password)) { 
        throw new Error('Email or Password are incorrect') 
    }

    try {
        return await signJWT(`${existingUser.firstName} ${existingUser.lastName}`, existingUser._id)
    } catch(err) {
        console.log(err);
    }
    // Sign and return JWT
}


async function logout(token) {
    blacklist.add(token)
}

async function getUserPosts(userId) {
    return await User.findById(userId).select('myPosts firstName lastName').populate('myPosts').lean();
}

async function getEmail(userId) {
    return await User.findById(userId).select('email').lean()
}


module.exports = {
    register,
    login,
    logout,
    getUserPosts,
    getEmail
}