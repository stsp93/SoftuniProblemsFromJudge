const Book = require('../models/Book');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(book) {

    try {
        await Book.create(book);

    } catch (error) {
        handleMongooseError(error)
    }
}

async function getAll() {
    return await Book.find({}).lean();
}

async function getById(id) {
    return await Book.findOne({ _id: id});
}

async function del(id) {
    try{
        await Book.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function update(book, edited) {
    Object.entries(edited).forEach(([k,v]) => book[k] = v)
    try {
        await book.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

async function wish(book, userId) {
    book.wishingList.push(userId);
    await book.save();
}

module.exports = {
    create,
    getAll,
    getById,
    del,
    update,
    wish
}