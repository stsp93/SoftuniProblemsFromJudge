const router = require('express').Router();
const housingService = require('../services/housingService');
const { parseError } = require('../utils/errorUtils');
const { isUser } = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');
const decorateHousing = require('../utils/decorateHousing')

router.get('/create', isUser, (req, res) => {
    res.render('createView')
})

router.post('/create', isUser, async (req, res) => {
    const input = req.body
    input.owner = req.user.id

    try {
        await housingService.create(input)
        res.status(201).redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input });
    }
})

router.get('/:id/edit', isUser, async (req, res) => {
    let housing = await housingService.getById(req.params.id)
    try {
        if (!isOwnerCheck(housing.owner?._id, req.user?.id)) throw new Error('You can edit only your own housing')
        res.render('editView', { housing })
    } catch (error) {
        console.log(error);
        housing = decorateHousing(housing)
        res.render('detailsView', { housing, error: parseError(error) });
    }

})

router.post('/:id/edit', isUser, async (req, res) => {
    const input = req.body;
    const housing = await housingService.getById(req.params.id);

    try {
        if (!isOwnerCheck(housing.owner?._id, req.user?.id)) throw new Error('You can edit only your own housing')
        await housingService.update(housing, input)
        res.status(201).redirect(`/housing/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), housing: input });
    }
})


router.get('/:id/delete', isUser, async (req, res) => {
    let housing = await housingService.getById(req.params.id);

    try {
        if (!isOwnerCheck(housing.owner?._id, req.user?.id)) throw new Error('You can delete only your own housing')
        await housingService.del(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        housing = decorateHousing(housing, req.user.id);
        res.render('detailsView', { housing, error: parseError(error) });
    }
})

router.get('/:id/rent', isUser, async (req, res) => {
    let housing = await housingService.getById(req.params.id);
    try {
        await housingService.rent(housing, req.user?.id);
        res.redirect(`/housing/${req.params.id}`);
    } catch (error) {
        console.log(error);
        housing = decorateHousing(housing, req.user.id)
        res.render('detailsView', { housing, error: parseError(error) });
    }

})

router.get('/search',async (req, res) => {
    const {query} = req.query

    const results = await housingService.getAll(query);

    res.render('searchView', {results})
})

router.get('/:id', async (req, res) => {
    let housing = await housingService.getById(req.params.id)
    housing = decorateHousing(housing, req.user.id)
    console.log(housing.renters);
    res.render('detailsView', { housing })
})

module.exports = router