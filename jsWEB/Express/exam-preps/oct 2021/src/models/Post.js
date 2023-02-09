const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    keyword: {
        type:String,
        required:[true, 'Keyword is required']
    },
    location: {
        type:String,
        required:[true, 'Location is required']
    },
    dateOfCreation: {
        type:String,
        match: [/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, 'Valid date format is dd.mm.yyyy'],
        required:[true, 'Date of creation is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    imageUrl: {
        type: String,
        match:[/^https?:\/\//,'Invalid URL'],
        required: [true, 'Image Url is required'],
    },
    author: {
        type : Types.ObjectId,
        ref:'User'
    },
    votes: [{
        type : Types.ObjectId,
        ref:'User'
    }],
    rating: {
        type : Number,
        default : 0,
    },

});

postSchema.index({title:1}, {
    collation: {
        locale:'en',
        strength:2
    }
});

const Post = model('Post', postSchema);

module.exports = Post;