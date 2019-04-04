/************************************************************************************
Get all courses
************************************************************************************/
const getAllCourses = courseModel => async (req, res, next) => {
    try {
        // Get all courses from the database
        const course = await courseModel.find({})
            .lean()
            // Return only the firstName and lastName of the given user
            .populate("user", "firstName lastName")
            .exec();
        // Return all available courses
        res.status(200).json(course);
    } catch (error) {
        // Throw error
        next(error);
    }
}


/************************************************************************************
Post a new course
************************************************************************************/
const postCourse = courseModel => async (req, res, next) => {
    // Get the course title, description (required) and the optional assets
    const courseToBeCreated = req.body;
    // Get the current logged in user id
    const loggedInUserID = req.currentUser._id;
    // Set the coure user to the current logged in user
    courseToBeCreated.user = loggedInUserID;

    try {
        // Create the course in the database
        const course = await courseModel.create(courseToBeCreated);
        const courseID = course.id;
        // Set the response header to '/:id'
        res.location(`/${courseID}`);
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
}


/************************************************************************************
Get a specific course
************************************************************************************/
const getCourse = courseModel => async (req, res, next) => {
    const courseId = req.params.id
    try {
        // Get the specified courses from the database
        const course = await courseModel.findById(courseId)
            .lean()
            // Return only the firstName and lastName of the given user
            .populate("user", "firstName lastName")
            .exec();
        // Return the course
        res.status(200).json(course);
    } catch (error) {
        // Throw error
        next(error);
    }
}


/************************************************************************************
Update a specific course
************************************************************************************/
const updateCourse = courseModel => async (req, res, next) => {
    const courseId = req.params.id;
    const courseToBeUpdated = req.body;
    // Mongoose update option: Required!
    const opts = { runValidators: true };
    try {
        // Update the course in the database
        const course = await courseModel.findByIdAndUpdate(courseId, courseToBeUpdated, opts);
        // Return nothing
        res.status(204).end();
    } catch (error) {
        // Throw validation error
        // Will only throw an error if title or description is "" (empty)
        if(error.name === "ValidationError") {
            return res.status(400).json({ error: error.message});
        }
        // Throw error
        next(error);
    }
}


/************************************************************************************
Delete a specific course
************************************************************************************/
const deleteCourse = courseModel => async (req, res, next) => {
    const courseId = req.params.id;
    try {
        // Delete the course in the database
        const course = await courseModel.findByIdAndDelete(courseId);
        // Return nothing
        res.status(204).end();
    } catch (error) {
        // Throw error
        next(error);
    }
}


/************************************************************************************
Export controllers
************************************************************************************/
module.exports = { getAllCourses, postCourse, getCourse, updateCourse, deleteCourse };