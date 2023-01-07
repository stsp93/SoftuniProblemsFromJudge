const playService = require('../services/playService');
const { handleError } = require('../utils/errorHandlingUtil');

const router = require('express').Router();

router.get('/create', (req,res) => {
    
    res.render('theater pages/create-theater')
})

router.post('/create', async (req,res) => {
    const play = req.body;
    try {
        await playService.createPlay(play)
        res.status(201).redirect('/')
    }catch (error) {
        console.log(error);
        res.status(400).render('theater pages/create-theater', handleError(error));
    }
})

module.exports = router