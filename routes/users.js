const express = require('express');
const router = express.Router();
const { User } = require('../models/models');

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', (req, res, next) => {
    User.find({}).exec((error, user) => error ? next(error) : res.json(user))
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', (req, res, next) => {
    const user = new User(req.body);
    user.save((error, user) => error ? next(error) : res.status(201).end());
})

module.exports = router;