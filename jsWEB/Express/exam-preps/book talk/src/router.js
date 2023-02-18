const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const { parseError } = require('./utils/errorUtils');


router.use('/', homeController);
router.use('/user', userController);
router.use('/book', bookController);
router.use('*', (req, res) => {
    res.render('404View',{error: parseError(req.query.err)});
});

module.exports = router
