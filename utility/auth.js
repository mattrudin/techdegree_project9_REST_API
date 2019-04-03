const express = require('express');
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models/models');

/************************************************************************************
Authentication middleware
************************************************************************************/
const authenticateUser = async (req, res, next) => {
    let errorMessage = null;
    let user = null;
    // Get the credentials from the users authorization header
    const credentials = auth(req);

    // Check if the user is available in the database
    if(credentials) {
        const name = credentials.name;
        try {
            user = await User.findOne({"emailAddress": name})
                .lean()
                .exec();
        } catch (error) {
            next(error);
        }

        if(user) {
            // Check the user password
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            if(authenticated) {
                console.log(`Authentication successful for name: ${user.emailAddress}`);
                req.currentUser = user;
            } else {
                errorMessage = `Authentication failure for name: ${user.emailAddress}`;
            }
        } else {
            errorMessage = `User not found for name: ${credentials.name}`;
        }
    } else {
        errorMessage = `Auth header not found`;
    }

    // If an error occures, refuse access
    if(errorMessage) {
        console.warn(errorMessage);
        res.status(401).json({ message: 'Access Denied'});
    } else {
        next();
    }
};

/************************************************************************************
Export middleware
************************************************************************************/
module.exports = authenticateUser;