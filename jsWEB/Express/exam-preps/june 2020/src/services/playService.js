const { Play } = require("../models/Play");

async function getAllPlays() {
    return await Play.find({isPublic:true}).select('title').select('usersLiked').select('imageUrl').lean()
}

async function getPlay(id) {
    return await Play.findOne({_id:id, isPublic:true}).lean();
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
    getAllPlays,
    getPlay
}