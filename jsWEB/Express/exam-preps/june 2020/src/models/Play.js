const { Schema, model, Types } = require('mongoose');

const playSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [50, 'Description should be less or equal than 50 symbols']
    },
    imageUrl: {
        type: String,
        match:[/^https:\/\//,'Invalid URL'],
        required: [true, 'Image Url is required'],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Schema.Types.Mixed,
        required: true,
        default: () => new Date().toString(),
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref:'User',
    }
    ,
    usersLiked: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
})



const Play = model('Play', playSchema);

exports.Play = Play;