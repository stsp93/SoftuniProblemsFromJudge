const Publication = require('../models/Publication');
const User = require('../models/User');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(publication, userId) {
    const user = await User.findById(userId);
    try {
        const newPublication = await Publication.create(publication);
        user.myPublications.push(newPublication);
        await user.save();

    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Publication.find({}).lean();
}

async function getById(id) {
    return await Publication.findOne({ _id: id}).populate('author', 'username');
}

async function del(id) {
    try{
        await Publication.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(publication, edited) {
    publication.title = edited.title;
    publication.paintingTechnique = edited.paintingTechnique;
    publication.imageUrl = edited.imageUrl;
    publication.certificate = edited.certificate;

    try {
        await publication.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function share(publicationId, userId) {
    const publication = await Publication.findById(publicationId);
    const user = await User.findById(userId);

    publication.usersShared.push(user);
    user.publicationShared.push(publication);
    return await Promise.all([publication.save(), user.save()]);
}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    share
}