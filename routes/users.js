const express = require('express');
const router = express.Router();
const { User } = require('../models/models');

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', (req, res) => {
    // TODO
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    // Error checking  
    const errors = user.validateSync();
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.message);
        return res.status(400).json({ errors: errorMessages });
    }

    res.status(201).end();
})

module.exports = router;