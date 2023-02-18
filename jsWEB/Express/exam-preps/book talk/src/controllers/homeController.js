const router = require('express').Router();
const { isUser } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService')
const userService = require('../services/userService')

router.get('/', (req, res) => {
        res.render('homeView');
})

router.get('/catalog', async (req, res) => {
        const books = await bookService.getAll();
        res.render('catalogView', {books});
})

router.get('/profile',isUser, async (req, res) => {
        const books = (await userService.getWishlist(req.user.id)).wishingList;

        res.render('catalogView', {books});
})

module.exports = router