const { Play } = require("../models/Play");

async function getAllPlays() {
    return await Play.find({}).select('title').select('usersLiked').select('imageUrl').lean()
    return await Play.find().lean()
}

async function createPlay(play) {
    if(play['check-box']) {
        play.isPublic = true;
        delete play['check-box'];
    }

    try {
        await Play.create(play);

    } catch(error) {
        throw new Error(Object.values(error.errors).join('<br>'));

    }
}

module.exports = {
    createPlay,
    getAllPlays
}