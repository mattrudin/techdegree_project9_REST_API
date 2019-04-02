const express = require('express');
const router = express.Router();
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
router.post('/', async (req, res, next) => {
    const courseToBeCreated = req.body;
    try {
        const course = await Course.create(courseToBeCreated);
        res.status(201).end();
    } catch (error) {
        next(error);
    }
})
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:id', async (req, res, next) => {
    const courseId = req.params.id;
    const courseToBeUpdated = req.body;
    try {
        const course = await Course.findByIdAndUpdate(courseId, courseToBeUpdated);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})
// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/:id', async (req, res, next) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

module.exports = router;