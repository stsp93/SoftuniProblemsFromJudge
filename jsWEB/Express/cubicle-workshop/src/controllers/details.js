const router = require('express').Router()
const { getAllAccessories, getAvailableAccessories } = require('../services/accessoryService');
const cubeService = require('../services/cubeService')


router.get('/:id', async (req,res) => {
    const cube = await cubeService.getCube(req.params.id).populate('accessories').lean();
    res.render('details',cube);
})

router.get('/:id/attach-accessory', async (req, res) => {
    const cube = await cubeService.getCube(req.params.id).lean();
    const accessories = await getAvailableAccessories(cube.accessories).lean()
    console.log(accessories);
    res.render('accessories/attach',{cube, accessories})
})

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId
    const accessoryId = req.body.accessory

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/details/${cubeId}`)
})

router.get('/:id/edit', async (req, res) => {

    res.render('edit')
})

router.get('/:id/delete', async (req, res) => {

    res.render('delete')
})

module.exports = router;