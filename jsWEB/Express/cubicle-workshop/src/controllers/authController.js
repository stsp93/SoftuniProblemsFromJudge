const router = require('express').Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/serviceConfig');

router.get('/register', (req, res) => {
    res.render('auth/registerPage')
})

router.post('/register', async (req, res) => {
    try {
        await userService.register(req.body)
    } catch {
        return res.render('404');
    }
    return res.redirect('/auth/login');
})

router.get('/login', (req, res) => {
    res.render('auth/loginPage');
})

router.post('/login', async (req, res) => {
    try {
        const user = await userService.login(req.body);

        const token = await new Promise((resolve, reject) => {
            jwt.sign({ user }, secret, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token);
            })
        })

        res.cookie('session', token, {httpOnly:true});

        return res.redirect('/');
    } catch {
        return res.render('404');
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.redirect('/')
})

module.exports = router;