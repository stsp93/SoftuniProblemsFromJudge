const { Accessory } = require('../models/Accessory');

exports.save = async function (accessory) {
    return await Accessory.create(accessory)
}

exports.getAccessory = function (id) {
   return Accessory.findById(id).lean()
}

exports.getAllAccessories = function () {

    const accessories = Accessory.find()
    return accessories;
}

exports.getAvailableAccessories = function (ids) {

    const accessories = Accessory.find({_id: {$nin:ids}})
    return accessories;
}