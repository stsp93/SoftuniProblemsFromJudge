const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const { secret } = require('../config/serviceConfig');

const tokenVerify = promisify(jwt.verify)

exports.auth = async (req, res, next) => {
    const session = req.cookies['session'];
    if (session) {
        try {
            const token = await tokenVerify(session, secret);
            req.user = token.user;
            res.locals.user = token.user;
        } catch {
            return res.render('404')
        }
    }

    next();
}
