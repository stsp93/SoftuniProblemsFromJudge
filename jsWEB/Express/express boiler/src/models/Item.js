const { Schema, model, Types } = require('mongoose');

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
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
})

/*

*/

itemSchema.index({title:1}, {
    collation: {
        locale:'en',
        strength:2
    }
});

const Item = model('Item', itemSchema);

module.exports = Item;