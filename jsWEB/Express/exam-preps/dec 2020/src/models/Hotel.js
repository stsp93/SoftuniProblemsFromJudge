const { Schema, model, Types } = require('mongoose');

const hotelSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    imageUrl: {
        type: String,
        match:[/^https?:\/\//,'Invalid URL'],
        required: [true, 'Image Url is required'],
    },
    freeRooms: {
        type:Number,
        required:[true, 'Free rooms is required field'],
        min: [1, 'Free rooms must be at least 1'],
        max: [100, 'Free rooms must be at most 100']
    },
    usersBooked: [
        {
            type: Types.ObjectId,
            ref:'User'
        }
    ],
    owner: {
        type: String,
        required: [true, 'Owner is required']
    }

}, {
    toObject: { virtuals: true }
})

hotelSchema.virtual('emptyRooms').get(function() {
    return this.freeRooms - this.usersBooked.length;
}) ;


hotelSchema.index({name:1}, {
    collation: {
        locale:'en',
        strength:2
    }
});

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;