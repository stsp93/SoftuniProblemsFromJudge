const router = require('express').Router();
const bookService = require('../services/bookService');
const userService = require('../services/userService');
const { parseError } = require('../utils/errorUtils');
const {isUser} = require('../middlewares/authMiddleware');
const isOwnerCheck = require('../utils/ownerCheck');

router.get('/create',isUser, (req,res) => {
    res.render('createView')
})

router.post('/create',isUser, async (req,res) => {
    const input = req.body
        input.owner = req.user.id
    try {
        await bookService.create(input)
        res.status(201).redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input });
    }
})

router.get('/:id/edit',isUser, async (req, res) => {
    const book = (await bookService.getById(req.params.id)).toObject();

    try {
        if (!isOwnerCheck(book.owner?._id, req.user?.id)) throw new Error('You can edit only your own books')
        res.render('editView', { book })
    } catch (error) {
        console.log(error);
        res.redirect(`/404?err=${error}`);
    }
    
})

router.post('/:id/edit',isUser, async (req, res) => {
    const input = req.body;
    const book = await bookService.getById(req.params.id);

    try {
        if (!isOwnerCheck(book.owner?._id, req.user?.id)) throw new Error('You can edit only your own books')
        await bookService.update(book, input)
        res.status(201).redirect(`/book/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), book:input });
    }
})


router.get('/:id/delete',isUser, async (req, res) => {
    const book = await bookService.getById(req.params.id);

    try {
        if (!isOwnerCheck(book.owner?._id, req.user?.id)) throw new Error('You can delete only your own books')
        await bookService.del(req.params.id);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        res.redirect(`/404?err=${error}`);
    }
})

router.get('/:id/wish',isUser, async (req, res) => {
    const book = await bookService.getById(req.params.id);

    try {
        if (isOwnerCheck(book.owner?._id, req.user?.id)) throw new Error('You can\'t add to your wishing list books that you own');
        if(book.wishingList.some(u => u._id.equals(req.user?.id))) throw new Error('You alreay added that book to your wishing list');
        await bookService.wish(book, req.user.id);
        await userService.wish(book, req.user.id);

        res.redirect(`/book/${book._id}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/404?err=${error}`);
    }
})

router.get('/:id', async (req, res) => {
    const book = (await bookService.getById(req.params.id)).toObject();
    book.isOwner = isOwnerCheck(book.owner?._id, req.user?.id);
    book.isWished = book.wishingList.some(u => u._id.equals(req.user?.id));
    res.render('detailsView', { book })
})

module.exports = router