const Course = require('../models/Course');
const User = require('../models/User');
const { handleMongooseError } = require('../utils/errorUtils');

async function create(course) {

    try {
        await Course.create(course);

    } catch (error) {
        console.log(error);
        handleMongooseError(error)
    }
}

async function getAll(query = '') {
    return await Course.find({title: {$regex: new RegExp(query, 'gi')}}).lean();
}


async function getCourse(id) {
    return await Course.findOne({ _id: id}).lean();
}

async function deleteCourse(id) {
    try{
        await Course.deleteOne({_id:id})
    } catch(error) {
        handleMongooseError(error)
    }
}

async function updateCourse(id, editedCourse) {
    const course = await Course.findOne({ _id: id })

    course.title = editedCourse.title;
    course.imageUrl = editedCourse.imageUrl;
    course.description = editedCourse.description;
    try {
        await course.save()
    } catch (error) {
        handleMongooseError(error)
    }
}

function get3Results() {
    return Course.aggregate([
        { $addFields: { length: { $size: "$enrolled" } } },
        { $sort: { length: -1, } },
        { $limit: 3 }
    ])
}

async function enroll(courseId, userId) {
    const course = await Course.findById(courseId)
    const user = await User.findById(userId);
    
    try {
        if(course.enrolled.includes(user._id)) throw new Error('Already enrolled')
        if(course.ownerId.equals(user._id)) throw new Error('You can\'t enroll for your own course')

        course.enrolled.push(user);
        await course.save();

        return true;
    } catch(error) {
        handleMongooseError(error)
    }
}

module.exports = {
    create,
    getAll,
    getCourse,
    deleteCourse,
    updateCourse,
    get3Results,
    enroll
}