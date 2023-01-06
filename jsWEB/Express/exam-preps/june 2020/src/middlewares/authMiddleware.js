const { verifyToken } = require("../services/userService");


async function auth(req, res, next) {
    const token = req.cookies['session'];

    if (token) {
        try {
            const decodedToken = await verifyToken(token)
            req.user = {
                username: decodedToken.username,
                id: decodedToken._id,
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

function isAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).redirect('/')
    }
    next()
}

function isGuest(req, res, next) {
    if (req.user) {
        return res.status(401).redirect('/')
    }
    next()
}


module.exports = {
    isAuth,
    isGuest,
    auth
}