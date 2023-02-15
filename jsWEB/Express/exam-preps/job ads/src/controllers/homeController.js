const router = require('express').Router();
const adService = require('../services/adService')
router.get('/', async (req, res) => {
        const ads = await adService.getFirst3()
        res.render('homeView', {ads, home:'active'});
})

router.get('/catalog', async (req, res) => {
        const ads = await adService.getAll()
        res.render('catalogView', {ads, catalog:'active'});
})


module.exports = router