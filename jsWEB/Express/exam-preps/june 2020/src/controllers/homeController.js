const router = require('express').Router()

router.get('/',(req,res) => {
    if(req.user) {
        res.render('user-home')
    } else {
        res.render('guest-home')
    }
})

// router.get('/user',(req,res) => {
//     res.render('user-home')
// })

module.exports = router