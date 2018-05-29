const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const User = require('../../models/user');

function index(request, response, next) {
    User.find({}, (err, projects) => {
        if (err) {
            next();
        }
        else {
            pugLoader.renderWithUser(request, response, 'view/users/config.pug', { users });
        }
    });
};

function viewOne(request, response, next) {
    const projectID = request.params.id;
    if (userID) {
        User.findById(userID, (err, user) => {
            if (err) {
                response.json({ err });
            } else {
                if (user) {
                    pugLoader.renderWithUser(request, response, 'view/projects/showOne.pug', { project });
                } else {
                    response.json({ err });
                }
            }
        });
    } else {
        response.json({ err: true });
    }
}

function create(request, response, next) {
    pugLoader.renderWithUser(request, response, 'view/users/config.pug');
}

module.exports = {
    index,
    create
};