const config = require('config');
const getId = require('../../util/lib/getIdFromToken');
const User = require('../../models/user');


function render(request, response, template, data) {
    return response.render(template, {
        scripts: config.get('view.head.scripts'),
        links: config.get('view.head.links'),
        data
    });
}

function renderWithUser(request, response, template, data = {}) {
    getId(request, (err, userID) => {
        User.findById(userID, (err, user) => {
            if (err) {
                response.json({ error });
            } else {
                if (user) {
                    data.user = user;
                    return response.render(template, {
                        scripts: config.get('view.head.scripts'),
                        links: config.get('view.head.links'),
                        data
                    });
                } else {
                    response.json({ error: true, message: "No se encontró el usuario" });
                }
            }
        });
    });
}

module.exports = {
    render,
    renderWithUser
};