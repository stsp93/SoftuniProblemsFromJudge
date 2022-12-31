const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware');
const { getAllAccessories, getAvailableAccessories } = require('../services/accessoryService');
const cubeService = require('../services/cubeService')


router.use(isAuth)

router.get('/:id', async (req,res) => {
    const cube = await cubeService.getCube(req.params.id).populate('accessories').lean();
    const isOwner = req.userId?._id.equals(cube.ownerId);
    console.log(req.userId);
    res.render('details',{cube, isOwner});
})


router.get('/:id/attach-accessory', async (req, res) => {
    const cube = await cubeService.getCube(req.params.id).lean();
    const accessories = await getAvailableAccessories(cube.accessories).lean();
    
    if(req.userId._id.equals(cube.ownerId)) {
      return res.render('accessories/attach',{cube, accessories})
    }
    return res.render('404')
})

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId
    const accessoryId = req.body.accessory

    await cubeService.attachAccessory(cubeId, accessoryId);

    
    if(req.userId._id.equals(cubeId)) {
        return res.redirect(`/details/${cubeId}`);
      }
      return res.render('404')
})

router.get('/:id/edit', async (req, res) => {
    const cube = await cubeService.getCube(req.params.id).lean();
    console.log(cube);
    if(req.userId._id.equals(cube.ownerId)) {
       return res.render('edit', cube)
    }
    return res.render('404');
})

router.post('/:id/edit', async(req, res) => {
    const cube = req.body
    await cubeService.updateCube(req.params.id, cube)
    res.redirect(`/details/${req.params.id}`)
})

router.get('/:id/delete', async (req, res) => {
    const cube = await cubeService.getCube(req.params.id).lean();
    if(req.userId._id.equals(cube.ownerId)) {
       return res.render('delete', cube)
    }
    return res.render('404')
    
})

router.post('/:id/delete', async(req, res) => {
    await cubeService.deleteCube(req.params.id)
    res.redirect('/')
})

module.exports = router;