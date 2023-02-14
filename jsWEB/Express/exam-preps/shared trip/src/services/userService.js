const { SALT_ROUNDS } = require("../config/constants");
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { signJWT, blacklist } = require("../utils/jwtUtils");
const { handleMongooseError } = require("../utils/errorUtils");


async function register(user) {
    const { email, gender, password, rePassword } = user;

    //Handle mismatching passwords
    if (!password) throw new Error('Password is required');
    if (password.length < 4) throw new Error('The password should be at least 4 characters long');
    if (password !== rePassword) throw new Error('Passwords don\'t match');

    //Hash Password
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const payload = {
        email,
        gender,
        password: hashedPassword,
    }

    try {
        //Create User
        const newUser = await User.create(payload);

        // Login (Sign and return JWT )
        return await signJWT(newUser.email,newUser.gender, newUser._id)

    } catch (error) {
        console.log(error);
        handleMongooseError(error);
    }
}

async function login(user) {
    const { email, password } = user;

    // Check email and pass
    const existingUser = await User.findOne({ email });
    if (!existingUser || !await bcrypt.compare(password, existingUser.password)) { 
        throw new Error('Email or Password are incorrect') 
    }

    try {
        // Sign and return JWT
        return await signJWT(existingUser.email,existingUser.gender, existingUser._id)
    } catch(err) {
        console.log(err);
    }
}


async function logout(token) {
    blacklist.add(token)
}

async function getProfile(userId) {
    return await User.findById(userId).select('-password').populate('tripsHistory', 'startPoint endPoint date time');
}

async function saveTrip(trip,userId) {
    const user = await User.findById(userId);
    user.tripsHistory.push(trip);

    user.save();
}

module.exports = {
    register,
    login,
    logout,
    getProfile,
    saveTrip
}