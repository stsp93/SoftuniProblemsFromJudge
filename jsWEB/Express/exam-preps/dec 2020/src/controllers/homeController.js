const router = require('express').Router();
const { isGuest } = require('../middlewares/authMiddleware');
const hotelService = require('../services/hotelService');
const { getProfile } = require('../services/userService');

router.get('/', async (req, res) => {
        const hotelsResult = await hotelService.getAll();
        let hotels = hotelsResult.map(h => h.toObject())

        hotels = hotels.sort((a,b) => b.emptyRooms - a.emptyRooms);

        res.render('homeView', {hotels});
})

router.get('/profile',isGuest, async (req, res) => {
        const profile = (await getProfile(req.user.id)).toObject();
        const bookedHotels =  profile.bookedHotels.map(h => h.name).join(', ')
        console.log(bookedHotels);
        res.render('profileView', {profile, bookedHotels})
})

module.exports = router