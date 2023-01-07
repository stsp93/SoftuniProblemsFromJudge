const { isAuth, hasLiked } = require('../middlewares/authMiddleware');
const playService = require('../services/playService');
const { handleError } = require('../utils/errorHandlingUtil');

const router = require('express').Router();


router.get('/:id',hasLiked, async (req, res) => {

    const play = await playService.getPlay(req.params.id);
    if (play) {
        return res.render('theater pages/theater-details', play)
    }
    res.redirect('/')
})

router.use('/', isAuth);

router.get('/create', (req, res) => {

    res.render('theater pages/create-theater')
})

router.post('/create', async (req, res) => {
    const play = req.body;
    play.ownerId = req.user.id;
    try {
        await playService.createPlay(play)
        res.status(201).redirect('/')
    } catch (error) {
        console.log(error);
        res.status(400).render('theater pages/create-theater', handleError(error));
    }
})



router.get('/:id/edit', async (req, res) => {
    const play = await playService.getPlay(req.params.id);
    res.render('theater pages/edit-theater', play)
})

router.post('/:id/edit', async (req, res) => {
    const editedPlay = req.body;
    try {
        await playService.updatePlay(req.params.id, editedPlay);
        res.status(201).redirect(`/theater/${req.params.id}`)
    }catch (error) {
        console.log(error);
        res.status(400).redirect(`/${req.params.id}`);
    }
})


router.get('/:id/delete', async (req, res) => {
    try {
        await playService.deletePlay(req.params.id)
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(400).render('theater pages/theater-details', handleError(error));
    }
})
router.get('/:id/like',hasLiked, async (req, res) => {
    
    try {
        if(req.user.hasLiked) throw new Error('You already have liked this post')
        await playService.likePlay(req.params.id, req.user.id);
        res.redirect(`/theater/${req.params.id}`)
    } catch (error) {
        console.log(error);
        res.render('theater pages/theater-details', handleError(error))
    }
})
module.exports = router