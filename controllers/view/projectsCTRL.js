const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const Project = require('../../models/project');

function index(request, response, next) {
    Project.find({}, (err, projects) => {
        if (err) {
            next();
        }
        else {
            pugLoader(response, 'view/projects/projects.pug', { projects });
        }
    });
};

function viewOne(request, response, next) {
    const projectID = request.params.id;
    if (projectID) {
        Project.findById(projectID, (err, project) => {
            if (err) {
                response.json({ err });
            } else {
                if (project) {
                    pugLoader(response, 'view/projects/showOne.pug', { project });
                } else {
                    response.json({ err });
                }
            }
        });
    } else {
        response.json({ err: true });
    }
}

module.exports = {
    index,
    viewOne
};