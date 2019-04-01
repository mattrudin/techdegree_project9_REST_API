const express = require('express');
const router = express.Router();
const { User } = require('../models/models');

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', async (req, res, next) => {
    const user = await User.find({}).exec((error, user) => error ? next(error) : res.status(200).json(user));
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', async (req, res, next) => {
    const userToBeCreated = req.body;
    const user = await User.create(userToBeCreated, (error) => error ? next(error) : res.status(201).end());
})

module.exports = router;