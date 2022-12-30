const router = require('express').Router()
const cubeService = require('../services/cubeService.js')
const accessoryService = require('../services/accessoryService');
const { getUserId } = require('../services/userService.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.use(isAuth);

router.route('/accessory')
    .get((req, res) =>
        res.render('accessories/createAccessory'))
    .post(async (req, res) => {
        const accessory = req.body;

        try {
            await accessoryService.save(accessory);
            res.redirect('/');
        } catch (err) {
            res.send(err);
        }
    })

router.route('/')
    .get((req, res) =>
        res.render('create'))
    .post(async (req, res) => {
        const cube = req.body

        cube['ownerId'] = await getUserId(req.user)
        try {
            await cubeService.save(cube);
            res.redirect('/');
        } catch (err) {
            res.send(err);
        }
    })




module.exports = router;

