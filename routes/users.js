const express = require('express');
const router = express.Router();

/************************************************************************************
api/users Routes
************************************************************************************/
// GET /api/users 200 - Returns the currently authenticated user
router.get('/', (req, res) => {
    // TODO
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content


module.exports = router;