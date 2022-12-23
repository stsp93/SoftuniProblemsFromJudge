const router = require('express').Router()

const homeController = require('./controllers/home.js')
const createController = require('./controllers/createController')
const detailsController = require('./controllers/details.js')
const errorController = require('./controllers/404.js')



router.use('/', homeController);
router.use('/create', createController);
router.use('/details', detailsController);
router.use('*', errorController);


module.exports = router