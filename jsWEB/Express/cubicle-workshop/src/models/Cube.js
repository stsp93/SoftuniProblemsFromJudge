const { Schema, model } = require('mongoose')

const cubeSchema = new Schema({
    name: String,
    description: String,
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
    accessories:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Accessory'
        }
    ]
})

const Cube = model('Cube', cubeSchema);

exports.Cube = Cube