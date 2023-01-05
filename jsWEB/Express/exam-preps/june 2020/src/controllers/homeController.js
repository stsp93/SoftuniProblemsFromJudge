const router = require('express').Router()

router.get('/',(req,res) => {
    res.render('guest-home')
})

// router.get('/user',(req,res) => {
//     res.render('user-home')
// })

module.exports = router