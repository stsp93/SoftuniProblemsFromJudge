const router = require('express').Router()
const cubeService = require('../services/cubeService')


router.get('/', async (req, res) => {
    const {search, from, to}= req.query
    const cubes = await cubeService.getAllCubes(search, from, to).lean();
    res.render('index',{cubes,search, from, to})
})

router.get('/about', (req, res) => {
    res.render('about')
})


module.exports = router