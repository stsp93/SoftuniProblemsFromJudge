const { Schema, model, Types } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    imageUrl: {
        type: String,
        match:[/^https?:\/\//,'Invalid URL'],
        required: [true, 'Image Url is required'],
    },
    review: {
        type: String,
        required: [true, 'Book review is required'],
        minLength: [10, 'The Review should be a minimum of 10 characters long']
    },
    genre: {
        type: String,
        required: [true, 'Genre review is required'],
    },
    stars: {
        type: String,
        required: [true, 'Stars are required'],
        validate: {
            validator: (v) => v >= 1 && v <= 5,
            message: 'The Stars should be a positive number between 1 and 5'
        }
    },
    owner: {
        type:Types.ObjectId,
        ref:'User'
    },
    wishingList: [
        {
            type:Types.ObjectId,
            ref:'User' 
        }
    ]
})

bookSchema.index({title:1}, {
    collation: {
        locale:'en',
        strength:2
    }
});


const Book = model('Book', bookSchema);

module.exports = Book;