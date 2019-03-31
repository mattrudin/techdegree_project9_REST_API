const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', (req, res) => {
    // TODO
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', [
    check('firstName')
      .exists()
      .withMessage('Please provide a value for "firstName"'),
    check('lastName')
      .exists()
      .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
        .exists()
        .withMessage('Please provide a value for "emailAddress'),
    check('password')
      .exists()
      .withMessage('Please provide a value for "password"'),
  ], (req, res) => {
    // Error checking  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const user = req.body;
    // TODO: Add user to the database
    res.status(201).end();
})

module.exports = router;