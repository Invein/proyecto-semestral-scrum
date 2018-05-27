const express = require('express');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const async = require('async');

function user(request, response, next) {
    const { fullName, birthdate, curp, rfc, address, skills, email, password } = request.body;

    let user = new User();
    user.fullName = fullName;
    user.birthdate = birthdate;
    user.curp = curp;
    user.rfc = rfc;
    user.address = address;
    user.skills = skills;
    user.email = email;

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            user.password = hash;
            user.salt = salt;

            user.save((err, obj) => {
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
        });
    });
}

module.exports = {
user
};