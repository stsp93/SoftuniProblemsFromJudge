const router = require('express').Router();
const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
        const results = await housingService.get3latest()
        res.render('homeView', {results});
})
router.get('/catalog', async (req, res) => {
        const results = await housingService.getAll()
        res.render('catalogView', {results});
})

module.exports = router