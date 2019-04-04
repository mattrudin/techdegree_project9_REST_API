const bcryptjs = require('bcryptjs');

/************************************************************************************
Get the current user
************************************************************************************/
const getUser = userModel => async (req, res, next) => {
    // Get the user information from the request
    const loggedInUser = req.currentUser;
    const name = loggedInUser.emailAddress;
    try {
        // Check if the user is available in the database
        const user = await userModel.findOne({"emailAddress": name})
            .lean()
            .exec();
            // Return the authenticated user
            res.status(200).json(user);
    } catch (error) {
        // Throw error
        next(error);
    }
}


/************************************************************************************
Post a new user
************************************************************************************/
const postUser = userModel => async (req, res, next) => {
    try {
        const userToBeCreated = req.body;
        const userPassword = userToBeCreated.password;
        // Check if the user provided a password
        if(userPassword) {
            // Hash the user password
            userToBeCreated.password = bcryptjs.hashSync(userPassword);
            // Create the user in the database
            const user = await userModel.create(userToBeCreated);
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
}


/************************************************************************************
Export controllers
************************************************************************************/
module.exports = { getUser, postUser };