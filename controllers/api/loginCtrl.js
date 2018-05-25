const async = require('async');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = function (request, response, next) {
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