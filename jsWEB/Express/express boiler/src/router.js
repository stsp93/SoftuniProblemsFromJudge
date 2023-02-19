const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const itemController = require('./controllers/itemController');
const { parseError } = require('./utils/errorUtils');


router.use('/', homeController);
router.use('/user', userController);
router.use('/item', itemController);
router.use('*', (req, res) => {
    res.render('404View',{error: parseError(req.query.err)});
});

module.exports = router
