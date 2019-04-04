const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { User } = require('../models/models');
const authenticateUser = require('../utility/auth');

/************************************************************************************
api/users Routes
************************************************************************************/
router.route('/')
    // GET /api/users 200 - Returns the currently authenticated user
    .get(authenticateUser, async (req, res, next) => {
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
    })
    // POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
    .post(async (req, res, next) => {
        try {
            const userToBeCreated = req.body;
            const userPassword = userToBeCreated.password;
            // Check if the user provided a password
            if(userPassword) {
                // Hash the user password
                userToBeCreated.password = bcryptjs.hashSync(userPassword);
                // Create the user in the database
                const user = await User.create(userToBeCreated);
                // Set the response header to '/'
                res.location('/');
                // Return nothing
                res.status(201).end();
            } else {
                const error = new Error("User validation failed: password is required.");
                error.name = "ValidationError";
                throw error;
            }
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