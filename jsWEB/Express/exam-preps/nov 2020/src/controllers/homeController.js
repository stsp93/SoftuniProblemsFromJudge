const router = require('express').Router();

router.get('/', (req, res) => {
    if(req.user) {
        res.render('userHomeView');
    } else {
        res.render('guestHomeView');
    }
})

module.exports = router