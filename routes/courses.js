const express = require('express');
const router = express.Router();
const { Course } = require('../models/models');

/************************************************************************************
api/courses Routes
************************************************************************************/
// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/', async (req, res, next) => {
    const course = await Course.find({}).exec((error, course) => {
        if(error) return next(error);
        res.status(200).json(course);
    });
});
// GET /api/courses/:id 200 - Returns a course (including the user that owns the course) for the provided course ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const course = await Course.findById({_id: id}).exec((error, course) => {
        if(error) return next(error);
        res.status(200).json(course)
    });
});
// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', async (req, res, next) => {
    const courseToBeCreated = req.body;
    const course = await Course.create(courseToBeCreated, (error) => {
        if(error) return next(error);
        res.status(201).end();
    });
})
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const courseToBeUpdated = req.body;
    const course = await Course.findByIdAndUpdate(id, req.body, (error) => {
        if(error) return next(error);
        res.status(204).end();
    });
})
// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete(id, (error) => {
        if(error) return next(error);
        res.status(204).end();
    })
})

module.exports = router;