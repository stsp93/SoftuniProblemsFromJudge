const Course = require('../models/Course');
const { get3Results, getAll } = require('../services/courseService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    if (req.user) {
        let {search} = req.query
        let courses = await getAll(search);
        courses = courses.sort((a,b) => new Date(b.createdAt ) - new Date(a.createdAt) );
        res.render('userHomeView', {courses});
    } else {
        const courses = await get3Results()
        res.render('guestHomeView', {courses});
    }
})


module.exports = router