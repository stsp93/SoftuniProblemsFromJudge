const router = require('express').Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/serviceConfig');

router.get('/register', (req, res) => {
    res.render('auth/registerPage')
})

router.post('/register', async (req, res) => {
    try {
        await userService.register(req.body);

        res.redirect('/auth/login');
    } catch (error) {
        res.render('auth/registerPage', {error:error.message});
    }
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

        res.cookie('session', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.render('auth/loginPage', {error:error.message});
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.redirect('/')
})

module.exports = router;