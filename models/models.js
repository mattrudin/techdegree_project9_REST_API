'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;


/************************************************************************************
Define schemas
************************************************************************************/
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const CourseSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedTime: String,
    materialsNeeded: String,
});


/************************************************************************************
Create model from schema
************************************************************************************/
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


/************************************************************************************
Export models
************************************************************************************/
module.exports = { User, Course };