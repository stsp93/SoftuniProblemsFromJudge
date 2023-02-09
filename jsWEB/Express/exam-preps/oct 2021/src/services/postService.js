const Post = require('../models/Post');
const { handleMongooseError } = require('../utils/errorUtils');
const User = require('../models/User');

async function create(postInput, userId) {
    const user = await User.findById(userId)
    try {
        const post = await Post.create(postInput);
        user.myPosts.push(post);
        await user.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Post.find({}).lean();
}

async function getById(id) {
    return await Post.findOne({ _id: id}).populate('author', 'firstName lastName').lean();
}

async function del(id) {
    try{
        await Post.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(id, editedPost) {
    const post = await Post.findOne({ _id: id })

    post.title = editedPost.title;
    post.imageUrl = editedPost.imageUrl;
    post.description = editedPost.description;
    try {
        await post.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function vote(type, userId, postId) {
    const post = await Post.findById(postId);
    post.votes.push(userId);
    if(type === 'upvote') post.rating++
    if(type === 'downvote') post.rating--

    await post.save()

}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    vote
}