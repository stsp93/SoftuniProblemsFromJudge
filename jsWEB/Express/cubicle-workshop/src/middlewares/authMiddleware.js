const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const { secret } = require('../config/serviceConfig');
const { getUserId } = require('../services/userService');

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

exports.isAuth = async (req, res, next) => {
    req.userId = await getUserId(req.user)
    next()
}

// exports.isOwner = (req, res, next) => {
//     if(!req.user) {
//         return res.status(403).send('You don\'t have permission');
//      }
 
//      next()
// }
