const router = require('express').Router()

router.get('/register',(req, res) => {
    res.render('register')
})
router.get('/login',(req,res) => {
    res.render('register')
})

module.exports = router