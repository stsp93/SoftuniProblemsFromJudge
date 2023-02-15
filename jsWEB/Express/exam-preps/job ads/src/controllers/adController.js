const router = require('express').Router();
const adService = require('../services/adService');
const userService = require('../services/userService');
const { parseError } = require('../utils/errorUtils');
const {isUser} = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');

router.get('/create',isUser, (req,res) => {
    res.render('createView', {create:'active'})
})

router.post('/create',isUser, async (req,res) => {
    const input = req.body
        input.author= req.user.id
    try {
        const ad = await adService.create(input)
        await userService.saveAd(ad, req.user.id)
        res.status(201).redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input ,create:'active'});
    }
})

router.get('/:id/edit',isUser, async (req, res) => {
    const ad = (await adService.getById(req.params.id)).toObject();

    try {
        if (!isOwnerCheck(ad.author?._id, req.user?.id)) throw new Error('You can edit only your own ads')
        res.render('editView', { ad })
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
    
})

router.post('/:id/edit',isUser, async (req, res) => {
    const input = req.body;
    const ad = await adService.getById(req.params.id);

    try {
        if (!isOwnerCheck(ad.author?._id, req.user?.id)) throw new Error('You can edit only your own ads')
        await adService.update(ad, input)
        res.status(201).redirect(`/ad/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), input });
    }
})


router.get('/:id/delete',isUser, async (req, res) => {
    const ad = await adService.getById(req.params.id);

    try {
        if (!isOwnerCheck(ad.author?._id, req.user?.id)) throw new Error('You can delete only your own ads')
        await adService.del(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
})

router.get('/:id/apply',isUser, async (req, res) => {
    const ad = await adService.getById(req.params.id);

    try {
        if (isOwnerCheck(ad.author?._id, req.user?.id)) throw new Error('You can\'t apply to your own ads')
        await adService.apply(ad, req.user.id);
        res.redirect(`/ad/${ad._id}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`);
    }
})

router.get('/search', async (req, res) => {
    const query = req.query.search || ''
    let ads = await adService.getAll(query);
    res.render('searchView', {ads, query, search:'active'})
})

router.get('/:id', async (req, res) => {
    const ad = (await adService.getById(req.params.id)).toObject();
    ad.isOwner = isOwnerCheck(ad.author?._id, req.user?.id);
    ad.isApplied = ad.usersApplied.some(u => u._id.equals(req.user?.id));
    res.render('detailsView', { ad })
})

module.exports = router