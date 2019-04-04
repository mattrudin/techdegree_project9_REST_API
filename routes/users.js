const express = require('express');
const router = express.Router();
const { User } = require('../models/models');
const { getUser, postUser} = require('../controllers/users.controllers');
const authenticateUser = require('../utility/auth');

/************************************************************************************
api/users Routes
************************************************************************************/
router.route('/')
    // GET /api/users 200 - Returns the currently authenticated user
    .get(authenticateUser, getUser(User))
    // POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
    .post(postUser(User))


/************************************************************************************
Export route
************************************************************************************/
module.exports = router;