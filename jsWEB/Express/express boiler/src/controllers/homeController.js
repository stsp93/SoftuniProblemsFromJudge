const router = require('express').Router();
const itemService = require('../services/itemService')

router.get('/', (req, res) => {
        res.render('homeView');
})

router.get('/catalog', async (req, res) => {
        res.render('catalogView');
})

module.exports = router