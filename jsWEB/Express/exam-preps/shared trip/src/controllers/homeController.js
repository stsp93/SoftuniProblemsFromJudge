const router = require('express').Router();
const tripService = require('../services/tripService')
const userService = require('../services/userService')

router.get('/', (req, res) => { 
        res.render('homeView');
})

router.get('/catalog',async (req, res) => {
        const trips = await tripService.getAll()
        res.render('catalogView', {trips})
})

router.get('/profile', async (req, res) => {
        const profile = await userService.getProfile(req.user.id);
        profile.tripsCount = profile.tripsHistory.length;
        res.render('profileView', {profile: profile.toObject()})
})

module.exports = router