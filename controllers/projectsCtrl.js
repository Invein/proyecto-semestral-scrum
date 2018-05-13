const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const jwt = require('jsonwebtoken');
const config = require('config');

const Project = require('../models/project');
const User = require('../models/user');


function index(request, response, next) {
    const page = request.params.page ? request.params.page : 1;
    Project.paginate({}, {
        page: page,
        limit: 3
    }, (err, objs) => {
        if (err) {
            response.json({
                error: true,
                message: 'No se pudieron obtener los proyectos.',
                objs: err
            });
        } else {
            response.json({
                error: false,
                message: 'Lista de proyectos.',
                objs: objs
            });
        }
    });
}

function create(request, response, next) {
    const { name, requestDate, startDate, description, teamMembers, scrum } = request.body;
    
    let project = new Project();

    name && (project.name = name);
    requestDate && (project.requestDate = requestDate);
    startDate && (project.startDate = startDate);
    description && (project.description = description);
    teamMembers && (project.teamMembers = teamMembers);
    scrum && (project.scrum = scrum);


    project.save((err, obj) => {
        if (err) {
            response.json({
                error: true,
                message: 'Proyecto no  Guardado',
                objs: err
            });
        } else {
            obj.password = null;
            obj.salt = null;
            response.json({
                error: false,
                message: 'Proyecto Guardado',
                objs: obj
            });
        }
    });
}

function update(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const projectId = request.params.id;

    jwt.verify(token, config.get('api.key'), (err, decoded) => {
        const id = decoded.id;

        User.findById(id, (err, user) => {
            if (err) {
                response.json({
                    error: err,
                    message: 'Error al buscar el usuario',
                    objs: {}
                });
            } else {
                Project.findById(projectId, (err, project) => {
                    if (err) {
                        response.json({
                            error: err,
                            message: 'Error al buscar el proyecto',
                            objs: {}
                        });
                    } else {
                        scrumMaster = project.teamMembers.find((teamMember) => {
                            return teamMember._id;
                        });
                    }
                });
            }
        });
    });
}

function remove(request, response, next) {
    const id = request.params.id;
    if (id) {
        Project.remove({
            _id: id
        }, function (err) {
            if (err) {
                response.json({
                    error: true,
                    message: 'Proyecto no Eliminado.',
                    objs: {}
                });
            } else {
                response.json({
                    error: false,
                    message: 'Proyecto Eliminado.',
                    objs: {}
                });
            }
        });
    } else {
        response.json({
            error: true,
            message: 'Proyecto no Existe',
            objs: {}
        });
    }
}

module.exports = {
    index,
    create,
    update,
    remove
};