const { Accessory } = require('../models/Accessory');
const { Cube } = require('../models/Cube');

exports.save = async function (cube) {
    try {
        await Cube.create(cube)

    } catch (error) {
        console.log(Object.keys(error.errors) + ' is incorrect');
        throw error
    }
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
        await Cube.findByIdAndDelete(cubeId)
}

exports.updateCube = async function(cubeId, cube) {
        await Cube.findByIdAndUpdate(cubeId,cube)
}