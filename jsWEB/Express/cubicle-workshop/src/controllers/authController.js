const router = require('express').Router();
const userService = require('../services/userService')

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
    res.render('auth/loginPage')
})

router.post('/login', async (req, res) => {
    try {
        await userService.login(req.body)
        return res.redirect('/');
    } catch {
        return res.render('404');
    }
})


module.exports = router;