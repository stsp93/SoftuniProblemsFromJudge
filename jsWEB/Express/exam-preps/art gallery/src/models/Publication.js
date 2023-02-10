const { Schema, model, Types } = require('mongoose');

const publicationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [6, 'The Title should be a minimum of 6 characters long.'],
    },
    paintingTechnique: {
        type: String,
        minLength: [15, 'The Painting technique should be a maximum of 15 characters long.'],
        required: [true, 'Painting technique is required'],
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid Image URL'],
        required: [true, 'Image Url is required'],
    },
    certificate: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            message: 'Certificate of authenticity value should be Yes or No'
        },
        required: [true, 'Certificate technique is required'],
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    usersShared: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]


})


publicationSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;