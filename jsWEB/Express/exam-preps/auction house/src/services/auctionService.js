const Auction = require('../models/Auction');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(auction) {

    try {
        await Auction.create(auction);

    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Auction.find({}).lean();
}

async function getById(id) {
    return await Auction.findOne({ _id: id}).populate('author', 'firstName lastName').populate('bidder','-password');
}

async function del(id) {
    try{
        await Auction.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(auction, edited) {
    Object.entries(edited).forEach(([k,v]) => auction[k] = v)
    try {
        await auction.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function bid(auction, userId, bid) {
    if(auction.price >= bid) throw new Error(`Your bid need to be higher than the current price (${auction.price})`);
    auction.price = bid;
    auction.bidder = userId;
    await auction.save()
}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    bid,
}