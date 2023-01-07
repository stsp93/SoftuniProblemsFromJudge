const { Play } = require("../models/Play");
const { verifyToken } = require("../services/userService");


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

async function hasLiked(req, res, next) {
    const play = await Play.findById(req.params.id);
    res.locals.hasLiked =  play.usersLiked.includes(req.user.id);
    req.user.hasLiked = play.usersLiked.includes(req.user.id);
    next()
}

async function isOwner(req,res, next) {
    const play = await Play.findById(req.params.id);
    res.locals.isOwner =  play.ownerId.equals(req.user.id)
    req.user.isOwner =  play.ownerId.equals(req.user.id)
    next();
}


module.exports = {
    isAuth,
    isGuest,
    hasLiked,
    isOwner,
    auth
}