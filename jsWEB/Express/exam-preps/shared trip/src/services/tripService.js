const Trip = require('../models/Trip');
const User = require('../models/User');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(trip) {
    try {
        return await Trip.create(trip);
    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Trip.find({}).lean();
}

async function getById(id) {
    return await Trip.findOne({ _id: id}).populate('creator', 'email').populate('buddies', 'email');
}

async function del(id) {
    try{
        await Trip.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(trip, edited) {
    Object.entries(edited).forEach(([k,v]) => trip[k] = v);
    try {
        await trip.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function join(trip, userId) {
    if(trip.buddies.some(bud => bud._id.equals(userId))) throw new Error('You already joined');
    if(trip.seats === 0) throw new Error('No empty seats');
    
    trip.buddies.push(userId);
    trip.seats--;
    await trip.save();

}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    join
}