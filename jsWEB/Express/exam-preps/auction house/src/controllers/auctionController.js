const router = require('express').Router();
const auctionService = require('../services/auctionService');
const userService = require('../services/userService');
const { parseError } = require('../utils/errorUtils');
const { isUser } = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');
const { optionsTemplate } = require('../utils/selectOptionsUtil');

router.get('/create', isUser, (req, res) => {
    res.render('createView', { options: optionsTemplate() })
})

router.post('/create', isUser, async (req, res) => {
    const input = req.body
    input.author = req.user.id
    const options = optionsTemplate(input.category);
    try {
        await auctionService.create(input)
        res.status(201).redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input, options });
    }
})

router.get('/:id/edit', isUser, async (req, res) => {
    const auction = (await auctionService.getById(req.params.id)).toObject();
    try {
        if (!isOwnerCheck(auction.author?._id, req.user?.id)) throw new Error('You can edit only your own auctions')
        res.render('editView', { auction, options: optionsTemplate(auction.category) })
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }

})

router.post('/:id/edit', isUser, async (req, res) => {
    const input = req.body;
    const auction = await auctionService.getById(req.params.id);
    const options = optionsTemplate(input.category)
    try {
        if (!isOwnerCheck(auction.author?._id, req.user?.id)) throw new Error('You can edit only your own auctions')
        await auctionService.update(auction, input)
        res.status(201).redirect(`/auction/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), auction: input, options });
    }
})


router.get('/:id/delete', isUser, async (req, res) => {
    const auction = await auctionService.getById(req.params.id);

    try {
        if (!isOwnerCheck(auction.author?._id, req.user?.id)) throw new Error('You can delete only your own auctions')
        await auctionService.del(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
})

router.post('/:id/bid', isUser, async (req, res) => {
    const auction = await auctionService.getById(req.params.id);
    const bid = req.body.bid
    try {
        if (isOwnerCheck(auction.author?._id, req.user?.id)) throw new Error('You can\'t bid on your own auctions')
        await auctionService.bid(auction, req.user.id, bid);
        res.redirect(`/auction/${auction._id}`);
    } catch (error) {
        console.log(error);
        auction.isOwner = isOwnerCheck(auction.author?._id, req.user?.id);
        auction.isBidder = auction.bidder?._id.equals(req.user?.id);
        res.render('detailsView', { auction: auction.toObject(), error: parseError(error) });
    }
})

router.get('/:id/close', isUser, async (req, res) => {
    const auction = await auctionService.getById(req.params.id);
    try {
        if (!isOwnerCheck(auction.author?._id, req.user?.id)) throw new Error('You can close only your own auctions');
        if (!auction.bidder) return res.redirect(`/auction/${auction._id}`)

        await userService.close(auction);
        await auctionService.del(req.params.id);
        res.redirect(`/closed-auctions`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
})

router.get('/:id', async (req, res) => {
    const auction = (await auctionService.getById(req.params.id)).toObject();
    auction.isOwner = isOwnerCheck(auction.author?._id, req.user?.id);
    auction.isBidder = auction.bidder?._id.equals(req.user?.id);
    res.render('detailsView', { auction });
})

module.exports = router