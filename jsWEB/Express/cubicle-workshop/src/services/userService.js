const bcrypt = require('bcrypt-promise');
const { saltRounds } = require('../config/serviceConfig');
const { User } = require('../models/User');


exports.register = async (userInput) => {
    if (userInput.password !== userInput.repeatPassword) {
        throw new Error('Passowords don\'t match')
    }

    const hash = await bcrypt.hash(userInput.password, saltRounds);
    const user = { username: userInput.username, hash }


    return await User.create(user)

}

exports.login = async (userInput) => {
    try {
        const user = await User.findOne({ username: userInput.username });

        if (!await bcrypt.compare(userInput.password, user.hash)) throw new Error('invalid password');

        return user.username;
    } catch {
        throw new Error('Username or Password are incorrect');
    }

}

exports.getUserId = async (username) => await User.findOne({ username });