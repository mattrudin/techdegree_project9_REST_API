const express = require('express');
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models/models');

const authenticateUser = async (req, res, next) => {
    // Get the credentials from the users authorization header
    let errorMessage = null;
    let user = null;
    const credentials = auth(req);
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

    if(errorMessage) {
        console.warn(errorMessage);
        res.status(401).json({ message: 'Access Denied'});
    } else {
        next();
    }
};

module.exports = authenticateUser;