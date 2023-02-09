const { JWT_SECRET } = require("../config/constants");
const { promisify } = require('util');
const  jwt  = require('jsonwebtoken');

const verifyTokenAsync = promisify(jwt.verify)
const jwtSignAsync = promisify(jwt.sign)

const blacklist = new Set();

const verifyToken = async (token) => {
    if (!blacklist.has(token)) {
        return await verifyTokenAsync(token, JWT_SECRET);
    } else {
        throw new Error('Token is blacklisted');
    }
}

function signJWT(name, id) {
    const payload = { name, id }
    return jwtSignAsync(payload, JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
    verifyToken,
    signJWT,
    blacklist
}