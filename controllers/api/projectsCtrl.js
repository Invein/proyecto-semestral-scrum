const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const jwt = require('jsonwebtoken');
const config = require('config');

const Project = require('../../models/project');
const User = require('../../models/user');

const getID = require('../../util/lib/getIdFromToken');


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
    getID(request, function (err, ownerID) {
        if (err) {
            request.json({ error: true, message: "Error al buscar el id del usuario", objs: err });
        } else {
            if (ownerID) {
                const { name, requestDate, startDate, description, teamMembers, scrum } = request.body;

                let project = new Project();

                name && (project.name = name);
                requestDate && (project.requestDate = requestDate);
                startDate && (project.startDate = startDate);
                description && (project.description = description);
                teamMembers && (project.teamMembers = teamMembers);
                scrum && (project.scrum = scrum);
                ownerID && (project.owner = ownerID);

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
            } else {
                request.json({ error: true, message: "Error al buscar el id del usuario", objs: err });
            }
        }
    });
}

function update(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const projectId = request.params.id;

    const { name, requestDate, startDate, description, teamMembers, scrum } = request.body;

    jwt.verify(token, config.get('api.key'), (err, decoded) => {
        const memberId = decoded.id;

        User.findById(memberId, (err, user) => {
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
                    } else if (project) {
                        member = project.teamMembers.find((teamMember) => {
                            return teamMember.member.toString() == memberId;
                        });

                        if (member) {
                            switch (member.role) {
                                case "scrum-master":
                                    name && (project.name = name);
                                    requestDate && (project.requestDate = requestDate);
                                    startDate && (project.startDate = startDate);
                                    description && (project.description = description);
                                    teamMembers && (project.teamMembers = teamMembers);
                                    scrum && (project.scrum = scrum);

                                    project.save((err, saved) => {
                                        if (err) {
                                            response.json({
                                                error: true,
                                                message: 'Error al modificar el proyecto.',
                                                objs: err
                                            });
                                        } else {
                                            response.json({
                                                error: false,
                                                message: 'Proyecto modificado',
                                                objs: saved
                                            });
                                        }
                                    });

                                    break;
                                case "developer":
                                    scrum && (project.scrum = scrum);
                                    project.save((err, saved) => {
                                        if (err) {
                                            response.json({
                                                error: true,
                                                message: 'Error al modificar el proyecto.',
                                                objs: err
                                            });
                                        } else {
                                            response.json({
                                                error: false,
                                                message: 'Proyecto modificado',
                                                objs: saved
                                            });
                                        }
                                    });
                                    break;
                                case "product-owner":
                                    scrum && (project.scrum = scrum);
                                    project.save((err, saved) => {
                                        if (err) {
                                            response.json({
                                                error: true,
                                                message: 'Error al modificar el proyecto.',
                                                objs: err
                                            });
                                        } else {
                                            response.json({
                                                error: false,
                                                message: 'Proyecto modificado',
                                                objs: saved
                                            });
                                        }
                                    });
                                    break;
                                default:
                                    response.json({
                                        error: true,
                                        message: 'El usuario no tiene privilegios para modificar este proyecto.',
                                        objs: {}
                                    });
                            }
                        } else {
                            response.json({
                                error: true,
                                message: 'El usuario no es un miembro del equipo del proyecto.',
                                objs: {}
                            });
                        }
                    } else {
                        response.json({
                            error: true,
                            message: 'El proyecto no existe',
                            objs: {}
                        });
                    }
                });
            }
        });
    });
}

function remove(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const projectId = request.params.id;

    jwt.verify(token, config.get('api.key'), (err, decoded) => {
        const memberId = decoded.id;

        User.findById(memberId, (err, user) => {
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
                        member = project.teamMembers.find((teamMember) => {
                            return teamMember.member && teamMember.member.toString() == memberId;
                        });

                        if (member && member.role == "scrum-master") {
                            Project.remove({
                                _id: projectId
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
                                message: 'El usuario no cuenta con los suficientes privilegios para borrar este proyecto.',
                                objs: {}
                            });
                        }
                    }
                });
            }
        });
    });
}

module.exports = {
    index,
    create,
    update,
    remove
};