const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const publicationController = require('./controllers/publicationController');


router.use('/', homeController);
router.use('/user', userController);
router.use('/publication', publicationController);
router.use('*', (req, res) => {
    res.render('404View')
});

module.exports = router
