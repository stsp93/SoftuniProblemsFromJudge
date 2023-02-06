const router = require('express').Router();
const courseService = require('../services/courseService');
const {    handleError, isOwnerCheck } = require('../utils/errorUtils');


router.get('/create', (req, res) => {
    res.render('createView')
})

router.post('/create', async (req, res) => {
    const course = req.body
    course.ownerId = req.user.id;
    try {
        await courseService.create(course)
        res.status(201).redirect('/')
    } catch (error) {
        console.log(error);
        res.status(400).render('createView', {error:handleError(error), input:course});
    }
})

router.get('/:id/delete', async (req, res) => {
    const course = await courseService.getCourse(req.params.id);
    try {
        isOwnerCheck(req.user.id, course.ownerId);
        await courseService.deleteCourse(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('detailsView', {error, course});
    }
})
router.get('/:id/edit', async (req, res) => {
    const course = await courseService.getCourse(req.params.id);
    try {
        isOwnerCheck(req.user.id, course.ownerId);
        res.render('editView', {course})
    } catch(error) {
        res.render('detailsView', {error, course})
    }
})

router.post('/:id/edit', async (req, res) => {
    try {
        const course = await courseService.getCourse(req.params.id);
        isOwnerCheck(req.user.id, course.ownerId);

        await courseService.updateCourse(req.params.id,req.body)
        res.redirect(`/course/${req.params.id}`);
    } catch(error) {
        res.render('editView', {error, course: req.body})
    }
})

router.get('/:id/enroll', async (req, res) => {
    const course = await courseService.getCourse(req.params.id);
    const isOwner = course.ownerId.equals(req.user.id);
    let isEnrolled;
    try {
        isEnrolled = await courseService.enroll(req.params.id,req.user.id)
        res.redirect(`/course/${req.params.id}`);
    } catch(error) {
        res.render('detailsView', {error,course,isOwner, isEnrolled});
    }
})

router.get('/:id', async (req, res) => {
    const course = await courseService.getCourse(req.params.id);
    const isOwner = course.ownerId.equals(req.user.id);
    const isEnrolled = course?.enrolled.some(id =>id.equals(req.user.id));
    res.render('detailsView', {course, isOwner, isEnrolled})
})

module.exports = router