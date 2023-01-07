const { getAllPlays } = require('../services/playService')

const router = require('express').Router()

router.get('/',async (req,res) => {
    let plays = await getAllPlays()

    if(req.user) {
        plays = plays.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        res.render('user-home', {plays})
    } else {
        plays = plays.slice(0, 3).sort((a, b) =>b.usersLiked.length - a.usersLiked.length)
        res.render('guest-home', {plays})
    }
})

router.get('/sort', async (req, res) => {

    let plays = await getAllPlays()

    if(req.query.q === 'date' ) {
        plays = plays.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        res.render('user-home', {plays})
    } else if(req.query.q === 'likes') {
        plays = plays.sort((a, b) =>b.usersLiked.length - a.usersLiked.length)
        res.render('user-home', {plays})
    }
})



module.exports = router