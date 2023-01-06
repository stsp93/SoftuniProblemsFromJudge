const router = require('express').Router();
const userService = require('../services/userService');

router.get('/register',(req, res) => {

    res.render('register');
})
router.post('/register',async (req, res) => {
    const user = req.body;
    try {
        await userService.register(user);
        
        res.status(201).redirect('/login');
    }catch(error) {
        console.error(error);
        res.status(400).render('register');
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
        console.error(error);
        res.status(400).render('login');
    }
})

module.exports = router