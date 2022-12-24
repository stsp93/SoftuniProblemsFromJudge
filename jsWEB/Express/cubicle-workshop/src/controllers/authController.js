const router = require('express').Router();
const userService = require('../services/userService')

router.get('/register', (req, res) => {
    res.render('auth/registerPage')
})

router.post('/register', async (req, res) => {

    const user =await userService.register(req.body)

   if(!user)  return res.render('404');

   return res.redirect('/');
})

router.get('/login', (req, res) => {
    res.render('auth/loginPage')
})


module.exports = router;