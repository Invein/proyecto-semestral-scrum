const express = require('express');
const Project = require('../models/project');
const bcrypt = require('bcrypt');
const async = require('async');

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
    project.name = name;
    project.requestDate = requestDate;
    project.startDate = startDate;
    project.description = description;
    project.teamMembers = teamMembers;
    project.scrum = scrum;    

    project.save((err, obj) => {
        if (err) {
            response.json({
                error: true,
                message: 'Usuario no  Guardado',
                objs: err
            });
        } else {
            obj.password = null;
            obj.salt = null;
            response.json({
                error: false,
                message: 'usuario Guardado',
                objs: obj
            });
        }
    });
}

function update(request, response, next) {
    return response.render("Not implemented yet!");
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
