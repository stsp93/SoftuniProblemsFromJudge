const { Schema, model, Types } = require('mongoose');

const cryptoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength:[2, 'The Name should be at least 2 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'The Description should be a minimum of 10 characters long']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: [true, 'Image Url is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function(price) {
              return price > 0;
            },
            message: 'Price need to be positive number'
          }
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Payment method is invalid'
        }
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    buyers: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]

})

cryptoSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;