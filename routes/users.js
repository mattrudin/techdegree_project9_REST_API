const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { User } = require('../models/models');
const authenticateUser = require('../utility/auth');

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', authenticateUser, async (req, res, next) => {
    // Get the user information from the request
    const loggedInUser = req.currentUser;
    const name = loggedInUser.emailAddress;
    try {
        // Check if the user is available in the database
        const user = await User.findOne({"emailAddress": name})
            .lean()
            .exec();
            // Return the authenticated user
            res.status(200).json(user);
    } catch (error) {
        // Throw error
        next(error);
    }
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', async (req, res, next) => {
    const userToBeCreated = req.body;
    // Hash the user password
    const userPassword = userToBeCreated.password;
    userToBeCreated.password = bcryptjs.hashSync(userPassword);
    try {
        // Create the user in the database
        const user = await User.create(userToBeCreated);
        // Set the response header to '/'
        res.location('/');
        // Return nothing
        res.status(201).end();
    } catch (error) {
        // Throw validation error
        if(error.name === "ValidationError") {
            return res.status(400).json({ error: error.message});
        }
        // Throw error
        next(error);
    }
})


/************************************************************************************
Export route
************************************************************************************/
module.exports = router;