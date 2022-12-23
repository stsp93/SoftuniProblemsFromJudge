const { Schema, model } = require('mongoose')

const accessorySchema = new Schema({
    name: String,
    description: {
        type:String,
        maxLength: 100,
    },
    difficultyLevel: Number,
    imageUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /^http/g.test(v)
            },
            message: (err) => 'Invalid image URL' + err
        }
    },
})

const Accessory = model('Accessory', accessorySchema);

exports.Accessory = Accessory