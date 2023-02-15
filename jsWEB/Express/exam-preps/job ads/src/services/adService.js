const Ad = require('../models/Ad');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(ad) {

    try {
        await Ad.create(ad);

    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll(query) {
    let ads = await Ad.find({}).populate('author', 'email').lean();
    if (query || query === '') ads = ads.filter(ad => ad.author.email.toLowerCase() === query.trim().toLowerCase());
    return ads;
}

async function getFirst3() {
    return await Ad.find({}).limit(3).lean();
}

async function getById(id) {
    return await Ad.findOne({ _id: id }).populate('author', 'email').populate('usersApplied', '-password');
}

async function del(id) {
    try {
        await Ad.deleteOne({ _id: id })
    } catch (error) {
        handleMongooseError(error)
    }
}

async function update(ad, edited) {
    Object.entries(edited).forEach(([k, v]) => ad[k] = v)
    try {
        await ad.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function apply(ad, userId) {
    if (ad.usersApplied.some(u => u._id.equals(userId))) throw new Error('Already applied')

    ad.usersApplied.push(userId);
    await ad.save();
}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    getFirst3,
    apply,
}