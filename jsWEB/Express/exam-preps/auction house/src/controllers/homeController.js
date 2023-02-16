const router = require('express').Router();
const { isUser } = require('../middlewares/authMiddleware');
const auctionService = require('../services/auctionService');
const userService = require('../services/userService');

router.get('/', (req, res) => {
        res.render('homeView');
})

router.get('/catalog', async (req, res) => {
        const auctions = await auctionService.getAll()
        res.render('catalogView', {auctions});
})

router.get('/closed-auctions',isUser, async (req, res) => {
        const auctions = (await userService.getClosedAuctions(req.user.id)).closedAuctions;
        res.render('closedAuctionsView', {auctions});
})

module.exports = router