const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const Project = require('../../models/project');
const getID = require('../../util/lib/getIdFromToken');
const ObjectId = require('mongoose').Types.ObjectId;
function index(request, response, next) {
    getID(request, (err, userID) => {
        Project.find({})
            .exec((err, projects = []) => {
                const filteredProjects = projects.filter((project) => {
                    if (project.owner.toString() == userID) {
                        return true;
                    } else {
                        for (let proyect of projects) {
                            for (let teamMember of proyect.teamMembers) {
                                if (teamMember.member.toString() == userID) return true;
                            }
                        }
                    }
                });

                if (err)
                    return next(err);
                else
                    return pugLoader.renderWithUser(request, response, 'view/projects/projects.pug', { projects: filteredProjects });
            });
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