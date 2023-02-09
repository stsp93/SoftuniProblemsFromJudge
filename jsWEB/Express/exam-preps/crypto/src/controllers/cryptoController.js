const router = require('express').Router();
const cryptoService = require('../services/cryptoService');
const isOwnerCheck = require('../utils/ownerCheck');
const { parseError } = require('../utils/errorUtils');
const { isUser } = require('../middlewares/authMiddleware');
const selectPaymentMethod = require('../utils/paymentMethods')

router.get('/catalog', async (req, res) => {
    const cryptos = await cryptoService.getAll();
    res.render('catalogView', { cryptos })
})

router.get('/create', isUser, (req, res) => {
    res.render('createView')
})

router.post('/create', isUser, async (req, res) => {
    const input = req.body
    const crypto = {
        name: input.name,
        imageUrl: input.imageUrl,
        price: input.price,
        description: input.description,
        paymentMethod: input.paymentMethod,
        owner: req.user?.id
    }
    try {
        await cryptoService.create(crypto, req.user?.id)
        res.status(201).redirect('/crypto/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', { error: parseError(error), input: crypto });
    }
})

router.get('/:id/edit', isUser, async (req, res) => {
    const crypto = await cryptoService.getById(req.params.id);

    const paymentOptions = selectPaymentMethod(crypto.paymentMethod)

    try {
        if (!isOwnerCheck(crypto.owner._id, req.user?.id)) throw new Error('You can edit only your own cryptos')
        res.render('editView', { crypto , paymentOptions})
    } catch (error) {
        console.log(error);
        res.redirect(`/crypto/${req.params.id}`);
    }
    
})

router.post('/:id/edit', isUser, async (req, res) => {
    const input = req.body;
    const dbcrypto = await cryptoService.getById(req.params.id);
    const crypto = {
        name: input.name,
        imageUrl: input.imageUrl,
        price: input.price,
        description: input.description,
        paymentMethod: input.paymentMethod,
    }

    try {
        if (!isOwnerCheck(dbcrypto.owner._id, req.user?.id)) throw new Error('You can delete only your own cryptos')
        await cryptoService.update(req.params.id, crypto)
        res.status(201).redirect(`/crypto/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).render('editView', { error: parseError(error), crypto });
    }
})

router.get('/:id/delete', isUser, async (req, res) => {
    const crypto = await cryptoService.getById(req.params.id);

    try {
        if (!isOwnerCheck(crypto.owner._id, req.user?.id)) throw new Error('You can delete only your own cryptos')
        await cryptoService.del(req.params.id);
        res.redirect('/crypto/catalog');
    } catch (error) {
        console.log(error);
        res.redirect(`/crypto/${req.params.id}`);
    }
})

router.get('/:id/buy', isUser, async (req, res) => {
    const crypto = await cryptoService.getById(req.params.id);
    crypto.isBought = crypto.buyers.some(id => id.equals(req.user?.id));

    if (crypto.isBought) return res.redirect(`/crypto/${req.params.id}`);


    await cryptoService.buy(crypto._id, req.user?.id);
    res.redirect(`/crypto/${req.params.id}`)

})


router.get('/search', async (req, res) => {
    const {query, paymentMethod} = req.query;
    const cryptos = await cryptoService.search(query, paymentMethod);

    const paymentOptions = selectPaymentMethod(crypto.paymentMethod)

    res.render('searchView', {cryptos, query, paymentOptions})
});

router.get('/:id', async (req, res) => {
    const crypto = await cryptoService.getById(req.params.id);
    crypto.isOwner = isOwnerCheck(crypto.owner, req.user?.id);
    crypto.isBought = crypto.buyers.some(id => id.equals(req.user?.id));
    res.render('detailsView', { crypto })
})

module.exports = router