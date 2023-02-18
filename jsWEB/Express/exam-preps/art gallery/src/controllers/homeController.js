const router = require('express').Router();
const { isUser } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const publicationService = require('../services/publicationService')
const userService = require('../services/userService')

router.get('/gallery',async (req, res) => {
        const publications = await publicationService.getAll();
        res.render('galleryView', {publications})
})

router.get('/profile',isUser,async (req, res) => {
        const userPubs = (await userService.getUserPublications(req.user.id)).toObject();
        res.render('profileView', {userPubs})
})


router.get('/',async (req, res) => {
        const publications = await publicationService.getAll();
        console.log((await User.findById(req.user.id)).toObject());
        res.render('homeView', {publications});
})



module.exports = router