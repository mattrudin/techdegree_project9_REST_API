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
    const loggedInUser = req.currentUser;
    const name = loggedInUser.emailAddress;
    try {
        const user = await User.findOne({"emailAddress": name})
            .lean()
            .exec();
            res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// DEBUG FUNCTION FOR GETTING ALL USERS
router.get('/all', async (req, res, next) => {
    try {
        const users = await User.find({})
            .lean()
            .exec();
            res.status(200).json(users);
    } catch (error) {
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
        const user = await User.create(userToBeCreated);
        // Set the response header to '/'
        res.location('/');
        res.status(201).end();
    } catch (error) {
        if(error.name === "ValidationError") {
            return res.status(400).json({ error: error.message});
        }
        next(error);
    }
})

module.exports = router;