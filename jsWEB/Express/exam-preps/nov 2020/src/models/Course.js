const { Schema, model, Types } = require('mongoose');

const courseSchema = new Schema({
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
    duration: {
        type:String,
        required:[true, 'Duration is required']
    },
    createdAt: {
        type:Date,
        required:true,
        default: () => Date.now().toString()
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    enrolled: [
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]

})

courseSchema.index({title:1}, {
    collation: {
        locale:'en',
        strength:2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;