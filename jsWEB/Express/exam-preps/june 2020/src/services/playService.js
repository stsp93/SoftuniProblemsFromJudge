const { Play } = require("../models/Play");
const { User } = require("../models/User");
const { handleMongooseError } = require("../utils/errorHandlingUtil");

async function getAllPlays() {
    return await Play.find({ isPublic: true }).select('title').select('usersLiked').select('imageUrl').lean()
}

async function getPlay(id) {
    return await Play.findOne({ _id: id, isPublic: true }).lean();
}



async function createPlay(play) {
    if (play['check-box']) {
        play.isPublic = true;
        delete play['check-box'];
    }
    

    try {
        await Play.create(play);

    } catch (error) {
        handleMongooseError(error)

    }
}

async function updatePlay(id, editedPlay) {
    const play = await Play.findOne({ _id: id })

    play.isPublic = editedPlay['check-box'] ? true : false;
    play.title = editedPlay.title;
    play.imageUrl = editedPlay.imageUrl;
    play.description = editedPlay.description;
    try {
        await play.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function deletePlay(id) {
    try{
        await Play.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}
async function likePlay(playId, userId) {
    const play = await Play.findById(playId)
    const user = await User.findById(userId);
    play.usersLiked.push(user)
 
    try {
        play.save();
    } catch(error) {
        handleMongooseError(error)
    }
}

module.exports = {
    createPlay,
    getAllPlays,
    getPlay,
    updatePlay,
    deletePlay,
    likePlay
}