const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const Project = require('../../models/project');
const User = require('../../models/user');
const getID = require('../../util/lib/getIdFromToken');


function index(request, response, next) {
    getID(request, (err, userID) => {
        Project.find({})
            .populate('owner')
            .populate('teamMembers.member')
            .exec((err, projects = []) => {
                const filteredProjects = projects.filter((project) => {
                    if (project.owner.id == userID) {
                        return true;
                    } else {
                        const isIn = project.teamMembers.find((teamMember) => {
                            return teamMember.member.id == userID;
                        });
                        if (isIn) return true;
                        else return false;
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
                    next(err);
                } else {
                    if (project) {
                        User.find({}).exec((err, users) => {
                            pugLoader.renderWithUser(request, response, 'view/projects/showOne.pug', { project, users });
                        });
                    } else {
                        next(new Error("No se obtubo ningun resultado"));
                    }
                }
            });
    } else {
        next(new Error("Id de projecto no recibido"));
    }
}

function create(request, response, next) {
    pugLoader.renderWithUser(request, response, 'view/projects/createForm.pug');
}

function productBacklog(request, response, next) {
    getID(request, (err, userID) => {
        const projectID = request.params.projectID;
        Project.findById(projectID)
            .populate('owner')
            .populate('teamMembers.member')
            .exec((err, project) => {
                if (err)
                    return next(err);
                else
                    return pugLoader.renderWithUser(request, response, 'view/projects/productBacklog.pug', { project });
            });
    });
}

module.exports = {
    index,
    viewOne,
    create,
    productBacklog
};