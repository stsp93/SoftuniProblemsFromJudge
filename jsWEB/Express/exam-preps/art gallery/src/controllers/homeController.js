const router = require('express').Router();
const { isUser } = require('../middlewares/authMiddleware');
const Publication = require('../models/Publication');
const User = require('../models/User');
const publicationService = require('../services/publicationService')
const userService = require('../services/userService')

router.get('/gallery',async (req, res) => {
        const publications = await publicationService.getAll();
        res.render('galleryView', {publications})
})

router.get('/profile',isUser,async (req, res) => {
        const userPubs = (await User.findById(req.user.id)).toObject().myPublications
        res.render('profileView', {userPubs})
})


router.get('/',async (req, res) => {
        const publications = (await User.findById(req.user.id)).toObject().myPublications
        const pubs = (await Publication.find({}).select('_id')).map(o => o._id)

        const update = await User.findOneAndUpdate({_id:req.user.id}, 
                {$pull: {'myPublications':{_id: {$nin: pubs}}}});

                console.log(update);
        console.log(pubs);
        console.log('UPDATED            ' , publications);

        res.render('homeView', {publications});
})



module.exports = router