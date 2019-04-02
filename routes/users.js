const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { User } = require('../models/models');

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', async (req, res, next) => {
    try {
        const user = await User.find({})
            .exec();
            res.status(200).json(user);
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
        res.status(201).end();
    } catch (error) {
        next(error);
    }
})

module.exports = router;