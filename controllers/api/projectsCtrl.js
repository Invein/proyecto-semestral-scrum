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
                const { name, requestDate, startDate, description, scrum } = request.body;

                let project = new Project();

                name && (project.name = name);
                requestDate && (project.requestDate = requestDate);
                startDate && (project.startDate = startDate);
                description && (project.description = description);
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

function putTeamMember(request, response, next) {
    getID(request, (err, userID) => {
        if (err)
            return response.json({ error: err, objs: {}, message: "" });
        if (!userID)
            return response.json({ error: true, message: "no se encontro el usuario", objs: {} });

        const { member, role } = request.body;
        const { projectID } = request.params;

        Project.findById(projectID).exec((err, project) => {
            if (err)
                return response.json({ error: err, objs: {}, message: "" });
            if (!project)
                return response.json({ error: true, message: "no se encontro el proyecto", objs: {} });
            if (project.owner.toString() != userID)
                return response.json({ error: true, message: "Debes ser el dueño del proyecto para poder editarlo", objs: {} });

            // @TODO: Validar que el miembor a añadir no sea el owner y no esté repetido
            project.teamMembers.push({ member, role });
            project.save((err, savedProject) => {
                if (err)
                    return next(err);
                if (!savedProject)
                    return response.json({ error: true, message: "no se pudo guardar el proyecto", objs: {} });
                response.json({
                    error: false,
                    message: "Miembro añadido",
                    objs: {}
                });
            });
        });
    });
}

function deleteTeamMember(request, response, next) {
    getID(request, (err, userID) => {
        if (err)
            return next(err);
        if (!userID)
            return response.json({ error: true, message: "no se encontro el usuario", objs: {} });

        const { projectID, memberID } = request.params;

        Project.findById(projectID).exec((err, project) => {
            if (err)
                return next(err);
            if (!project)
                return response.json({ error: true, message: "no se encontro el proyecto", objs: {} });
            if (project.owner.toString() != userID)
                return response.json({ error: true, message: "Debes ser el dueño del proyecto para poder editarlo", objs: {} });


            const filteredTeamMembers = project.teamMembers.filter((teamMember) => {
                return teamMember.member.toString() != memberID;
            });

            project.teamMembers = filteredTeamMembers;

            project.save((err, savedProject) => {
                if (err)
                    return next(err);
                if (!savedProject)
                    return response.json({ error: true, message: "no se pudo guardar el proyecto", objs: {} });
                response.json({
                    error: false,
                    message: "Miembro eliminado",
                    objs: {}
                });
            });
        });
    })
}

function deleteProductBacklog(request, response, next) {

}

function putProductBacklog(request, response, next) {
    getID(request, (err, userID) => {
        if (err)
            return response.json({ error: err, objs: {}, message: "" });
        if (!userID)
            return response.json({ error: true, message: "no se encontro el usuario", objs: {} });

        const history = JSON.parse(request.body.history);
        const { projectID } = request.params;

        Project.findById(projectID).populate('owner').populate('teamMembers.member').exec((err, project) => {
            if (err)
                return response.json({ error: err, objs: {}, message: "" });
            if (!project)
                return response.json({ error: true, message: "no se encontro el proyecto", objs: {} });
            if (project.owner.id != userID) {
                const member = project.teamMembers.find(teamMember => teamMember.member.id == userID);
                if (!member)
                    return response.json({ error: true, message: "No eres miembro del proyecto", objs: {} });
                if (member.role == "developer" || member.role == "executive" || member.role == "tester")
                    return response.json({ error: true, message: "No se cuenta con suficientes pivilegios para editar el proyecto", objs: {} });
            }

            project.productBacklog.push(history);
            project.save((err, savedProject) => {
                if (err)
                    return next(err);
                if (!savedProject)
                    return response.json({ error: true, message: "no se pudo guardar el proyecto", objs: {} });
                response.json({
                    error: false,
                    message: "Historia añadida",
                    objs: {}
                });
            });

        });
    })
}
module.exports = {
    index,
    create,
    update,
    remove,
    putTeamMember,
    deleteTeamMember,
    putProductBacklog,
    deleteProductBacklog
};