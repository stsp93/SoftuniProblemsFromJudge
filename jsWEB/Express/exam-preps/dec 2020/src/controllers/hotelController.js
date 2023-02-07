const router = require('express').Router();
const isOwnerCheck = require('../utils/ownerCheck')
const hotelService = require('../services/hotelService');
const userService = require('../services/userService');
const { handleError } = require('../utils/errorUtils');
const { isOwner } = require('../services/userService');
const { isGuest } = require('../middlewares/authMiddleware');

router.use(isGuest)

router.get('/add', (req, res) => {
    res.render('createView')
})

router.post('/add', async (req, res) => {
    const input = req.body
    const hotel = {
        name: input.hotel,
        city: input.city,
        imageUrl: input.imgUrl,
        freeRooms: input['free-rooms'],
        owner: req.user.username
    }
    try {
        await hotelService.create(hotel)
        res.status(201).redirect('/');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: handleError(error), input: hotel });
    }
})


router.get('/:id/delete', async (req, res) => {
    const hotel = (await hotelService.getById(req.params.id)).toObject();
    const owner = (await userService.getProfile(req.user.id))._id;

    try {
        isOwnerCheck(owner, req.user.id);
        await hotelService.del(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('detailsView', { error, hotel });
    }
})

router.get('/:id/edit', async (req, res) => {
    const hotel = (await hotelService.getById(req.params.id)).toObject();
    const owner = (await userService.getProfile(req.user.id))._id;
    try {
        isOwnerCheck(owner, req.user.id);
        res.render('editView', { hotel })
    } catch (error) {
        res.render('detailsView', { error, hotel })
    }
})

router.post('/:id/edit', async (req, res) => {
    const owner = (await userService.getProfile(req.user.id))._id;
    const input = req.body
    const hotel = {
        name: input.hotel,
        city: input.city,
        imageUrl: input.imgUrl,
        freeRooms: input['free-rooms'],
        owner: req.user.username
    }
    try {
        isOwnerCheck(owner, req.user.id);

        await hotelService.update(req.params.id, hotel)
        res.redirect(`/hotel/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.render('editView', { error, hotel })
    }
})

router.get('/:id/book', async (req, res) => {
    const hotel = (await hotelService.getById(req.params.id)).toObject();
    const isOwner = await userService.isOwner(req.user.id, hotel.owner);
    let isBooked;
    try {
        if(isOwner) throw new Error('You can\'t book your own hotel');
        isBooked = await hotelService.book(req.params.id, req.user.id)
        res.redirect(`/hotel/${req.params.id}`);
    } catch (error) {
        res.render('detailsView', { error, hotel, isOwner, isBooked });
    }
})


router.get('/:id', async (req, res) => {
    let hotel = (await hotelService.getById(req.params.id)).toObject();

    const isOwnerFlag = await isOwner(req.user.id, hotel.owner);
    const isBooked = await hotelService.isBooked(req.params.id, req.user.id)
    try {
        res.render('detailsView', { hotel, isOwner: isOwnerFlag, isBooked })
    } catch (error) {
        res.render('detail')
    }

})

module.exports = router