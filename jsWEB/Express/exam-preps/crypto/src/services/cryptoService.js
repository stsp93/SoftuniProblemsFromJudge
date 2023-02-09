const Crypto = require('../models/Crypto');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(crypto) {

    try {
        await Crypto.create(crypto);

    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Crypto.find({}).lean();
}

async function getById(id) {
    return await Crypto.findOne({ _id: id }).lean();
}

async function del(id) {
    try {
        await Crypto.deleteOne({ _id: id })
    } catch (error) {
        handleMongooseError(error)
    }
}

async function update(id, editedCrypto) {
    const crypto = await Crypto.findOne({ _id: id })

    crypto.name = editedCrypto.name,
        crypto.imageUrl = editedCrypto.imageUrl,
        crypto.price = editedCrypto.price,
        crypto.description = editedCrypto.description,
        crypto.paymentMethod = editedCrypto.paymentMethod
    try {
        await crypto.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function buy(cryptoId, userId) {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);
    await crypto.save();
}

async function search(query = '', paymentMethod) {
    return await Crypto.find({ name: new RegExp(query, 'i'), paymentMethod }).lean()

}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    buy,
    search
}