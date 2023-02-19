const Item = require('../models/Item');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(item) {

    try {
        await Item.create(item);

    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Item.find({}).lean();
}

async function getById(id) {
    return await Item.findOne({ _id: id});
}

async function del(id) {
    try{
        await Item.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(item, edited) {
    Object.entries(edited).forEach(([k,v]) => item[k] = v)
    try {
        await item.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update
}