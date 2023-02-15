const { Schema, model, Types } = require('mongoose');

const adSchema = new Schema({
    headline: {
        type: String,
        required: [true, 'Headline is required'],
        minLength: [4, 'The Headline should be a minimum of 4 characters long']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [8, 'The Location should be a minimum of 8 characters long']
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        minLength: [3, 'The Company name should be at least 3 characters']
    },
    companyDescription: {
        type: String,
        required: [true, 'Company description is required'],
        maxLength: [40, 'The Company description should be a maximum of 40 characters long']
    },
    author: {
        type: Types.ObjectId,
        ref:'User'
    },
    usersApplied: [
        {
            type: Types.ObjectId,
            ref:'User'   
        }
    ]
});


adSchema.index({headline:1}, {
    collation: {
        locale:'en',
        strength:2
    }
});

const Ad = model('Ad', adSchema);

module.exports = Ad;