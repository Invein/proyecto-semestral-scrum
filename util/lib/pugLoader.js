config = require('config');

module.exports = function (response, template, data) {
    response.render(template, {
        scripts: config.get('view.head.scripts'),
        links: config.get('view.head.links'),
        data
    });
}