const { Accessory } = require('../models/Accessory');
const { Cube } = require('../models/Cube');

exports.save = async function (cube) {
    return await Cube.create(cube)
}

exports.getCube = function (id) {
   return Cube.findById(id)
}

exports.getAllCubes = function (search , from, to) {
    from = +from || 0;
    to = +to || 6;
    const cubes = Cube.find({ name: { $regex: new RegExp(search,'gi') } , difficultyLevel:{$gte:+from, $lte:+to}})
    return cubes;
}

exports.attachAccessory = async function (cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);

    cube.save()

    return cube;
}

exports.deleteCube = async function(cubeId) {
    try {
        await Cube.findByIdAndDelete(cubeId)
    } catch (err) {
        console.log(err);
    }
}

exports.updateCube = async function(cubeId, cube) {
    try {
        await Cube.findByIdAndUpdate(cubeId,cube)
    } catch (err) {
        console.log(err);
    }
}