const router = require('express').Router();
const { isGuest } = require('../middlewares/authMiddleware');
const { handleError } = require('../utils/errorHandlingUtil');
const userService = require('../services/userService');


router.get('/logout',(req, res) => {
    userService.logout(req.user.token);
    res.clearCookie('session');
    res.redirect('/')
})

// Guest Session handling
router.use('/',isGuest)

router.get('/register',(req, res) => {

    res.render('register');
})
router.post('/register',async (req, res) => {
    const user = req.body;
    try {
        await userService.register(user);
        
        res.status(201).redirect('/user/login');
    }catch(error) {
        res.status(400).render('register', handleError(error));
    }

})



router.get('/login',(req,res) => {
    res.render('login')
})
router.post('/login', async (req, res) => {
    const user = req.body
    try {
        // Login to get token
        const token = await userService.login(user);
        // Attach Cookie
        res.cookie('session', token,{httpOnly:true});
        res.redirect('/');
    } catch (error) {

        res.status(400).render('login', handleError(error));
    }
})

module.exports = router