const { isUser } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const userService = require('../services/userService');
const { handleError } = require('../utils/errorUtils');

const router = require('express').Router();

// LOGOUT HANDLER
router.get('/logout', (req, res) => {
   userService.logout(req.user.token)
    res.clearCookie('session');
    res.redirect('/')
})

// GUEST SESSION HANDLING
router.use('/', isUser)


// REGISTER HANDLERS
router.get('/register', (req, res) => {
    res.render('registerView');
});

router.post('/register',async (req, res) => {
    const user = req.body;

    try {
        const token = await userService.register(user);
        res.cookie('session', token,{httpOnly:true});
        res.status(201).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).render('registerView',{error:handleError(err), input:user});
    }
});


// LOGIN HANDLERS
router.get('/login', async (req, res) => {
    res.render('loginView');
});

router.post('/login', async (req, res) => {
    const user = req.body;
    try {
       const token = await userService.login(user);
       res.cookie('session', token,{httpOnly:true});
       res.status(201).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).render('loginView',{error:handleError(err), input:user.email});
    }
});

module.exports = router
