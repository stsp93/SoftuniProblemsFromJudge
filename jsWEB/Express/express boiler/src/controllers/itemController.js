const router = require('express').Router();
const itemService = require('../services/itemService');
const { parseError } = require('../utils/errorUtils');
const {isUser} = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');

router.get('/create',isUser, (req,res) => {
    res.render('createView')
})

router.post('/create',isUser, async (req,res) => {
    // const input = req.body
    //     input.owner: req.user.id
    // try {
    //     await itemService.create(input)
    //     res.status(201).redirect('/catalog');
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).render('createView', { error: parseError(error), input });
    // }
})

router.get('/:id/edit',isUser, async (req, res) => {
    // const item = (await itemService.getById(req.params.id)).toObject();

    // try {
    //     if (!isOwnerCheck(item.owner?._id, req.user?.id)) throw new Error('You can edit only your own items')
    //     res.render('editView', { item })
    // } catch (error) {
    //     console.log(error);
    //     res.redirect(`/404?err=${error}`);
    // }
    
})

router.post('/:id/edit',isUser, async (req, res) => {
    // const input = req.body;
    // const item = await itemService.getById(req.params.id);

    // try {
    //     if (!isOwnerCheck(item.owner?._id, req.user?.id)) throw new Error('You can edit only your own items')
    //     await itemService.update(item, input)
    //     res.status(201).redirect(`/item/${req.params.id}`);
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).render('editView', { error: parseError(error), item:input });
    // }
})


router.get('/:id/delete',isUser, async (req, res) => {
    // const item = await itemService.getById(req.params.id);

    // try {
    //     if (!isOwnerCheck(item.owner?._id, req.user?.id)) throw new Error('You can delete only your own items')
    //     await itemService.del(req.params.id);
    //     res.redirect('/catalog');
    // } catch (error) {
    //     console.log(error);
    //     res.redirect(`/404?err=${error}`);
    // }
})

router.get('/:id', async (req, res) => {
    // const item = (await itemService.getById(req.params.id)).toObject();
    // item.isOwner = isOwnerCheck(item.owner?._id, req.user?.id);
    // item.isBought = item.buyers.some(u => u._id.equals(req.user?.id));
    // res.render('detailsView', { item })
})

module.exports = router