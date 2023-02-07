const { isOwner } = require("../services/userService");
const { verifyToken } = require("../utils/jwtUtils");

async function auth(req, res, next) {
    const token = req.cookies['session'];

    if (token) {
        try {
            const decodedToken = await verifyToken(token)

            req.user = {
                username: decodedToken.username,
                id: decodedToken.id,
                token
            };
            res.locals.user = decodedToken.username;
        } catch (err) {
            console.log(err);
            res.clearCookie('session')
            res.status(401).redirect('/')
        }
    }

    next()
}



function isGuest(req, res, next) {
    if(!req.user) return res.redirect('/user/login');
    next()
}

function isUser(req, res, next) {
    if (!req.user) {
        return res.status(401).redirect('/')
    }
    next()
}


module.exports = {
    isGuest,
    isUser,
    auth
}