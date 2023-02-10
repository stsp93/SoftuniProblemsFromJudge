const router = require('express').Router();
const publicationService = require('../services/publicationService');
const { parseError } = require('../utils/errorUtils');
const {isUser} = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');

router.get('/create',isUser, (req,res) => {
    res.render('createView')
})

router.post('/create',isUser, async (req,res) => {
    const publication = req.body;
    publication.author = req.user.id;
    try {
        await publicationService.create(publication, req.user?.id)
        res.status(201).redirect('/gallery');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input: publication });
    }
})

router.get('/:id/edit',isUser, async (req, res) => {
    const publication = await publicationService.getById(req.params.id);

    try {
        if (!isOwnerCheck(publication.author?._id, req.user?.id)) throw new Error('You can edit only your own publications')
        res.render('editView', { input: publication.toObject() })
    } catch (error) {
        console.log(error);
        res.status(403).redirect(`/publication/${req.params.id}`);
    }
    
})

router.post('/:id/edit',isUser, async (req, res) => {
    const input = req.body;
    const publication = await publicationService.getById(req.params.id);

    try {
        if (!isOwnerCheck(publication.author?._id, req.user?.id)) throw new Error('You can delete only your own publications')
        await publicationService.update(publication, input)
        res.status(201).redirect(`/publication/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), input });
    }
})


router.get('/:id/delete',isUser, async (req, res) => {
    const publication = await publicationService.getById(req.params.id);

    try {
        if (!isOwnerCheck(publication.author?._id, req.user?.id)) throw new Error('You can delete only your own publications')
        await publicationService.del(req.params.id);
        res.redirect('/gallery');
    } catch (error) {
        console.log(error);
        res.redirect(`/publication/${req.params.id}`);
    }
})

router.get('/:id/share',isUser, async (req, res) => {
    const publication = (await publicationService.getById(req.params.id)).toObject();
    publication.isShared = publication.usersShared.some(id => id.equals(req.user?.id));
    try {
        if (isOwnerCheck(publication.author?._id, req.user?.id)) throw new Error('You can\'t share your own publications');
        if(publication.isShared) throw new Error('You already shared this publication');
        await publicationService.share(req.params.id, req.user?.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect(`/publication/${req.params.id}`);
    }
})

router.get('/:id', async (req, res) => {
    const publication = (await publicationService.getById(req.params.id)).toObject();
    publication.isAuthor = isOwnerCheck(publication.author?._id, req.user?.id);
    publication.isShared = publication.usersShared.some(id => id.equals(req.user?.id));
    res.render('detailsView', { publication})
})

module.exports = router