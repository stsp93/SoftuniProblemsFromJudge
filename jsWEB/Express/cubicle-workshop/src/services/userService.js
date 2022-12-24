const bcrypt = require('bcrypt-promise');
const { saltRounds } = require('../config/serviceConfig');
const { User } = require('../models/User');


exports.register = async (userInput) => {
    if(userInput.password !== userInput.repeatPassword) {
        return;
    }

    const hash = await bcrypt.hash(userInput.password, saltRounds);
    const user = {username:userInput.username, hash}
    try {
        return await User.create(user)
    } catch {
        return;
    }
}