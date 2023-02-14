const router = require('express').Router();
const tripService = require('../services/tripService');
const userService = require('../services/userService');
const { parseError } = require('../utils/errorUtils');
const {isUser} = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');

router.get('/create',isUser, (req,res) => {
    res.render('createView')
})

router.post('/create',isUser, async (req,res) => {
    const input = req.body
    input.creator = req.user.id
    try {
        const trip = await tripService.create(input);
        await userService.saveTrip(trip, req.user.id)
        res.status(201).redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input });
    }
})

router.get('/:id/edit',isUser, async (req, res) => {
    const trip = (await tripService.getById(req.params.id)).toObject();

    try {
        if (!isOwnerCheck(trip.creator?._id, req.user?.id)) throw new Error('You can edit only your own trips')
        res.render('editView', { trip })
    } catch (error) {
        console.log(error);
        res.status(403).redirect(`/trip/${req.params.id}?err=${error}`);
    }
    
})

router.post('/:id/edit',isUser, async (req, res) => {
    const input = req.body;
    const trip = await tripService.getById(req.params.id);

    try {
        if (!isOwnerCheck(trip.creator?._id, req.user?.id)) throw new Error('You can edit only your own trips')
        await tripService.update(trip, input)
        res.status(201).redirect(`/trip/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), trip:input });
    }
})


router.get('/:id/delete',isUser, async (req, res) => {
    const trip = await tripService.getById(req.params.id);

    try {
        if (!isOwnerCheck(trip.creator?._id, req.user?.id)) throw new Error('You can delete only your own trips')
        await tripService.del(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.redirect(`/trip/${req.params.id}`);
    }
})

router.get('/:id/join', async (req,res) => {
    const trip = await tripService.getById(req.params.id)
    
    try {
        await tripService.join(trip, req.user.id);
        res.redirect(`/trip/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/trip/${req.params.id}?err=${error}`);
    }
})

router.get('/:id', async (req, res) => {
    const trip = (await tripService.getById(req.params.id)).toObject();
    trip.isOwner = isOwnerCheck(trip.creator?._id, req.user?.id);
    trip.isJoined = trip.buddies.some(bud => bud._id.equals(req.user?.id));
    trip.buddiesJoined = (trip.buddies.map(b => b.email).join(', '));
    res.render('detailsView', { trip , error: req.query?.err})
})

module.exports = router