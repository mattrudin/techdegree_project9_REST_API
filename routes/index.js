const express = require('express');
const router = express.Router();

/************************************************************************************
User Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', (req, res) => {
    // TODO
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

/************************************************************************************
Courses Routes
************************************************************************************/
// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)

// GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content

// PUT /api/courses/:id 204 - Updates a course and returns no content

// DELETE /api/courses/:id 204 - Deletes a course and returns no content


module.exports = router;