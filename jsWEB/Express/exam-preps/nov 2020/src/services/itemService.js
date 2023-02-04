const Item = require('../models/Item')

async function create(item) {

    try {
        await Item.create(item);

    } catch (error) {
        handleMongooseError(item)
    }
}

async function getAll() {
    return await Play.find({}).lean();
}

async function getItem(id) {
    return await Play.findOne({ _id: id}).lean();
}

async function deleteItem(id) {
    try{
        await Play.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function updateItem(id, editedItem) {
    const item = await Item.findOne({ _id: id })

    item.title = editedItem.title;
    item.imageUrl = editedItem.imageUrl;
    item.description = editedItem.description;
    try {
        await item.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

module.exports = {
    create,
    getAll,
    getItem,
    deleteItem,
    updateItem
}