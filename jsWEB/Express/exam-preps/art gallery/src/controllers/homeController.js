const router = require('express').Router();
const { isUser } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService')
const userService = require('../services/userService')

router.get('/gallery',async (req, res) => {
        const publications = await publicationService.getAll();
        res.render('galleryView', {publications})
})

router.get('/profile',isUser,async (req, res) => {
        const userPubs = (await userService.getUserPublications(req.user.id)).toObject();
        userPubs.owned = userPubs.myPublications.map(p => p.title).join(', ')
        userPubs.shared = userPubs.publicationShared.map(p => p.title).join(', ')
        res.render('profileView', {userPubs})
})


router.get('/',async (req, res) => {
        const publications = await publicationService.getAll();
        res.render('homeView', {publications});
})



module.exports = router