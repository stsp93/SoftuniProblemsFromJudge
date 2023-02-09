const router = require('express').Router();
const { isGuest } = require('../middlewares/authMiddleware');
const postService = require('../services/postService');
const userService = require('../services/userService');
const { handleError } = require('../utils/errorUtils');
const isOwnerCheck = require('../utils/ownerCheck');


router.get('/all-posts', async (req, res) => {
    const posts = await postService.getAll();

    res.render('allPostsView', {posts})
})

router.get('/user-posts',isGuest,async (req,res) => {
    const user = await userService.getUserPosts(req.user.id);

    const posts = user.myPosts.map(p => {
        p.name =`${user.firstName} ${user.lastName}`
        return p
    })
    res.render('userPostsView',{posts})
})

router.get('/create',isGuest, (req, res) => {
    res.render('createView')
})

router.get('/:id/upvote',isGuest,vote)
router.get('/:id/downvote',isGuest,vote)

async function vote(req, res) {
    const type = req.path.slice(26);
    console.log(type);

    const post = await postService.getById(req.params.id);
    post.hasVoted = post.votes.some(id=> id.equals(req.user.id))
    console.log(post.hasVoted);
    try {
        if(post.hasVoted) throw new Error('You already voted');
        if(isOwnerCheck(post.author, req.user.id)) throw new Error('You cannot vote on your own post');

        await postService.vote(type, req.user.id, req.params.id)
        res.redirect(`/post/${post._id}`)
    }catch(error) {
        console.log(error);
        res.render('detailsView', {error:handleError(error) ,post})
    }
}


router.post('/create',isGuest, async (req, res) => {
    const input = req.body
    const post = {
        title: input.title,
        keyword: input.keyword,
        imageUrl: input.imageUrl,
        location: input.location,
        dateOfCreation: input.dateOfCreation,
        description: input.description,
        author: req.user.id
    }
    try {
        await postService.create(post, req.user.id)
        res.status(201).redirect('/post/all-posts');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: handleError(error), input: post });
    }
})

router.get('/:id/edit',isGuest, async (req, res) => {
    const post = await postService.getById(req.params.id);
    try {
        if(!isOwnerCheck(post.author._id, req.user.id)) throw new Error('You can edit only your own posts')
    }catch (error) {
        console.log(error);
        res.render('detailsView', { error:handleError(error), post });
    }
    res.render('editView', {post})
})

router.post('/:id/edit',isGuest, async (req, res) => {
    const input = req.body
    const post = {
        title: input.title,
        keyword: input.keyword,
        imageUrl: input.imageUrl,
        location: input.location,
        dateOfCreation: input.dateOfCreation,
        description: input.description,
        author: req.user.id
    }
    try {

        await postService.update(req.params.id,post)
        res.status(201).redirect(`/post/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: handleError(error), post });
    }
})

router.get('/:id/delete', async (req, res) => {
    const post = await postService.getById(req.params.id);

    try {
        if(!isOwnerCheck(post.author._id, req.user.id)) throw new Error('You can delete only your own posts')
        await postService.del(req.params.id);
        res.redirect('/post/all-posts');
    } catch (error) {
        console.log(error);
        res.render('detailsView', { error:handleError(error), post });
    }
})

router.get('/:id', async (req, res) => {
    const post =await postService.getById(req.params.id);
    post.hasVoted = post.votes.some(id=> id.equals(req.user.id))
    const voters =await Promise.all(post.votes.map(async id => await userService.getEmail(id))) 
    post.voters = voters.map(v => v.email).join(', ');
    post.authorName = `${post.author.firstName} ${post.author.lastName}`
    post.isOwner = isOwnerCheck(post.author._id, req.user.id);
    res.render('detailsView', {post});
})

module.exports = router