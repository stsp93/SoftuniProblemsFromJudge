const Housing = require('../models/Housing');
const { handleMongooseError } = require('../utils/errorUtils');
const isOwnerCheck = require('../utils/ownerCheck');

async function create(housing) {

    try {
        await Housing.create(housing);

    } catch (error) {
        handleMongooseError(error)
    }
}

async function get3latest() {
    return await Housing.find({}).find({}).sort({ createdAt: -1 }).limit(3).lean();
}

async function getAll(query = '') {
    return await Housing.find({name: new RegExp(query, 'i')}).lean();
}

async function getById(id) {
    return await Housing.findOne({_id: id }).populate('usersRenting', 'name')
}

async function del(id) {
    try {
        await Housing.deleteOne({ _id: id })
    } catch (error) {
        handleMongooseError(error)
    }
}

async function update(housing, edited) {
    housing.name = edited.name;
    housing.type = edited.type;
    housing.year = edited.year;
    housing.city = edited.city;
    housing.imageUrl = edited.imageUrl;
    housing.description = edited.description;
    housing.availablePieces = edited.availablePieces;

    console.log(housing);


    try {
        await housing.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function rent(housing, userId) {
    if (housing.usersRenting.some(u => u._id.equals(userId))) throw new Error('You already rented this house');
    if (isOwnerCheck(housing.owner?._id, userId)) throw new Error('You can\'t rent your own house');
    if(housing.availablePieces <= 0) throw new Error('No available pieces left');
    housing.usersRenting.push(userId);
    housing.availablePieces--;
    return await housing.save()
}


module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    get3latest,
    rent,

}