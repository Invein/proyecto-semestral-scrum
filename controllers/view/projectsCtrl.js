const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const Project = require('../../models/project');

function index(request, response, next) {
    Project.find({}, function (err, projects) {
        if (err) {
            next();
        }
        else {
            pugLoader.renderWithUser(request, response, 'view/projects/projects.pug', { projects });
        }
    });
};

function viewOne(request, response, next) {
    const projectID = request.params.id;
    if (projectID) {
        Project.findById(projectID)
            .populate('teamMembers.member')
            .populate('owner')
            .exec(function (err, project) {
                if (err) {
                    response.json({ err });
                } else {
                    if (project) {
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
    pugLoader.renderWithUser(request, response, 'view/projects/createForm.pug');
}

module.exports = {
    index,
    viewOne,
    create
};