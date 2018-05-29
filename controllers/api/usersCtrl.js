const express = require('express');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const async = require('async');
const getIdFromToken = require('../../util/lib/getIdFromToken');

function index(request, response, next) {
    const page = request.params.page || request.query.page || 1;
    User.paginate({}, {
        page: page,
        limit: 3
    }, (err, objs) => {
        if (err) {
            response.json({
                error: true,
                message: 'no se pudo extraer los usuarios',
                objs: {}
            });
        } else {
            objs.docs.map(obj => { obj.password = null, obj.salt = null });

            response.json({
                error: false,
                message: 'Lista de Usuarios',
                objs: objs
            });
        }
    });
}

function update(request, response, next) {
    getIdFromToken(request, function (err, userId) {
        if (userId) {
            const { fullName, birthdate, curp, rfc, address } = request.body;
            User.findById(userId, (error, doc) => {
                if (!error) {
                    if (doc) {
                        doc.fullName = fullName || doc.fullName;
                        doc.birthdate = birthdate || doc.birthdate;
                        doc.curp = curp || doc.curp;
                        doc.rfc = rfc || doc.rfc;
                        doc.address = address || doc.address;
                        doc.save((error, savedDoc) => {
                            if (error) {
                                response.json({
                                    error: error,
                                    message: 'No se pudo guardar tus cambios',
                                    objs: {}
                                });
                            }
                            else {
                                response.json({
                                    error: false,
                                    message: 'Se guardo correctamente',
                                    objs: {}
                                });
                            }
                        });
                    }
                    else {
                        response.json({
                            error: true,
                            message: 'El usuario no existe',
                            objs: {}
                        });
                    }
                }
                else {
                    response.json({
                        error,
                        message: "Tienes un error",
                        objs: {}
                    });
                }
            });
        }
        else {
            response.json({
                error: true,
                message: 'No se encontro el id del usuario',
                objs: {}
            });
        }
    });
}

function remove(request, response, next) {
    const id = request.params.id;
    if (id) {
        User.remove({
            _id: id
        }, function (err) {
            if (err) {
                response.json({
                    error: true,
                    message: 'Usuario no Eliminado.',
                    objs: {}
                });
            } else {
                response.json({
                    error: false,
                    message: 'Usuario Eliminado.',
                    objs: {}
                });
            }
        });
    } else {
        response.json({
            error: true,
            message: 'Usuario no Existe',
            objs: {}
        });
    }
}

function login(request, response, next) {
    const email = request.body.email;
    const password = request.body.password;
    const key = config.get('api.key');

    async.parallel({
        user: (callback) => {
            User.findOne({
                email: email
            }).exec(callback);
        }
    }, (err, results) => {
        const user = results.user;
        if (user) {
            bcrypt.hash(password, user.salt, function (err, hash) {
                if (hash === user.password) {
                    const payload = {
                        id: user._id
                    };
                    let token = jwt.sign(payload, key, {
                        expiresIn: 86400
                    });
                    response.json({
                        error: false,
                        message: 'Usuario y password ok',
                        objs: {
                            token: token
                        }
                    });
                } else {
                    response.json({
                        error: true,
                        message: 'Usuario y password incorrectos',
                        objs: {}
                    });
                }
            });
        } else {
            response.json({
                error: true,
                message: 'Usuario y password incorrectos',
                objs: {}
            });
        }
    });
};
function register(request, response, next) {
    const email = request.body.email;
    const password = request.body.password;
    const key = config.get('api.key');

    async.parallel({
        user: (callback) => {
            User.findOne({
                email: email
            }).exec(callback);
        }
    }, (err, results) => {
        const user = results.user;
        if (user) {
            bcrypt.hash(password, user.salt, function (err, hash) {
                if (hash === user.password) {
                    const payload = {
                        id: user._id
                    };
                    let token = jwt.sign(payload, key, {
                        expiresIn: 86400
                    });
                    response.json({
                        error: false,
                        message: 'Usuario y password ok',
                        objs: {
                            token: token
                        }
                    });
                } else {
                    response.json({
                        error: true,
                        message: 'Usuario y password incorrectos',
                        objs: {}
                    });
                }
            });
        } else {
            response.json({
                error: true,
                message: 'Usuario y password incorrectos',
                objs: {}
            });
        }
    });
};
function putSkill(request, response, next) {
    getIdFromToken(request, function (err, userId) {
        const { name, rank } = request.body;
        const skill = { name, rank: rank.toLowerCase() }

        if (userId) {
            User.findById(userId, (error, doc) => {
                if (!error) {
                    if (doc) {
                        doc.skills.push(skill);
                        doc.save((error, savedDoc) => {
                            if (error) {
                                response.json({
                                    error,
                                    message: 'No se pudo guardar',
                                    objs: {}
                                });
                            } else {
                                response.json({
                                    error: false,
                                    message: 'Se guardo correctamente',
                                    objs: {}
                                });
                            }
                        })
                    } else {
                        response.json({
                            error: true,
                            message: 'No se encontro el id',
                            objs: {}
                        });
                    }
                } else {
                    response.json({
                        error,
                        message: 'Tienes un error',
                        objs: {}
                    });
                }
            });
        }
        else {
            response.json({
                error: true,
                message: 'id invalido',
                objs: {}
            });
        }
    });
}
function removeSkill(request, response, next) {
    getIdFromToken(request, function (err, userId) {
        const skillId = request.params.skillID;
        if (skillId) {
            User.findById(userId, (error, doc) => {
                if (!error) {
                    if (doc) {
                        const filteredSkills = doc.skills.filter((skill) => {
                            return skill._id != skillId;
                        });

                        doc.skills = filteredSkills;
                        doc.save((error, savedDoc) => {
                            if (error) {
                                response.json({
                                    error: true,
                                    message: 'No se pudo guardar',
                                    objs: {}
                                });
                            } else {
                                response.json({
                                    error: false,
                                    message: 'Se removio corractamente',
                                    objs: {}
                                });
                            }
                        })
                    } else {
                        response.json({
                            error: true,
                            message: 'No se encontro el id',
                            objs: {}
                        });
                    }
                } else {
                    response.json({
                        error: true,
                        message: 'id o skill no encontrado',
                        objs: {}
                    });
                }
            });
        }
    });
}

module.exports = {
    index,
    update,
    remove,
    putSkill,
    removeSkill,
    login,
    register
};
