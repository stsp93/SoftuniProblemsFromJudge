const Hotel = require('../models/Hotel');
const User = require('../models/User');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(hotelInput) {
    const user = await User.findOne({username: hotelInput.owner});
    try {
        const hotel = await Hotel.create(hotelInput);
        user.offeredHotels.push(hotel._id);
        user.save();
    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Hotel.find({});
}

async function getById(id) {
    return await Hotel.findOne({ _id: id});
}

async function del(id) {
    try{
        await Hotel.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(id, editedHotel) {
    const hotel = await Hotel.findOne({ _id: id })

    hotel.name = editedHotel.name;
    hotel.city = editedHotel.city;
    hotel.freeRooms = editedHotel.freeRooms;
    hotel.imageUrl = editedHotel.imageUrl;
    try {
        await hotel.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function book(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId)
    const user = await User.findById(userId);
    
    try {
        if(hotel.usersBooked.includes(user._id)) throw new Error('Already booked')

        hotel.usersBooked.push(user);
        user.bookedHotels.push(hotel)
        await hotel.save();
        await user.save();

        return true;
    } catch(error) {
        handleMongooseError(error)
    }
}

async function isBooked(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId)
    return hotel.usersBooked.includes(userId)
}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    book,
    isBooked
}