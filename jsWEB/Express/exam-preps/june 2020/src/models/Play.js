const { Schema, model } = require('mongoose');

const playSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxLength: [50, 'Description should be less or equal than 50 symbols']
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Schema.Types.Mixed,
        required: true
    },
    usersLiked: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
})



const Play = model('Play', playSchema);

exports.Play = Play;