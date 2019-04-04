const express = require('express');
const router = express.Router();
const authenticateUser = require('../utility/auth');
const { Course } = require('../models/models');
const { getAllCourses, postCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/courses.controllers');

/************************************************************************************
api/courses/ Routes
************************************************************************************/
router.route('/')
    // GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
    .get(getAllCourses(Course))
    // POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
    .post(authenticateUser, postCourse(Course))


/************************************************************************************
api/courses/:id Routes
************************************************************************************/
router.route('/:id')
    // GET /api/courses/:id 200 - Returns a course (including the user that owns the course) for the provided course ID
    .get(getCourse(Course))
    // PUT /api/courses/:id 204 - Updates a course and returns no content
    .put(authenticateUser, updateCourse(Course))
    // DELETE /api/courses/:id 204 - Deletes a course and returns no content
    .delete(authenticateUser, deleteCourse(Course))
    

/************************************************************************************
Export route
************************************************************************************/
module.exports = router;