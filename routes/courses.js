const express = require('express');
const router = express.Router();
const authenticateUser = require('../utility/auth');
const { Course } = require('../models/models');

/************************************************************************************
api/courses Routes
************************************************************************************/
// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/', async (req, res, next) => {
    try {
        const course = await Course.find({})
            .lean()
            .exec();
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
});
// GET /api/courses/:id 200 - Returns a course (including the user that owns the course) for the provided course ID
router.get('/:id', async (req, res, next) => {
    const courseId = req.params.id
    try {
        const course = await Course.findById(courseId)
            .lean()
            .exec();
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
});
// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', authenticateUser, async (req, res, next) => {
    // Get the course title, description (required) and the optional assets
    const courseToBeCreated = req.body;
    // Get the current logged in user id
    const loggedInUserID = req.currentUser._id;
    // Set the coure user to the current logged in user
    courseToBeCreated.user = loggedInUserID;

    try {
        const course = await Course.create(courseToBeCreated);
        const courseID = course.id;
        // Set the response header to '/:id'
        res.location(`/${courseID}`);
        res.status(201).end();
    } catch (error) {
        if(error.name === "ValidationError") {
            return res.status(400).json({ error: error.message});
        }
        next(error);
    }
})
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:id', authenticateUser, async (req, res, next) => {
    const courseId = req.params.id;
    const courseToBeUpdated = req.body;
    const opts = { runValidators: true };
    try {
        const course = await Course.findByIdAndUpdate(courseId, courseToBeUpdated, opts);
        res.status(204).end();
    } catch (error) {
        if(error.name === "ValidationError") {
            return res.status(400).json({ error: error.message});
        }
        next(error);
    }
})
// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/:id', authenticateUser, async (req, res, next) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

module.exports = router;