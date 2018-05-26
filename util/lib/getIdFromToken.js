const config = require('config');
module.exports = function (request, onVerified) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.get('api.key'), (err, decoded) => {
            if (err) {
                onVerified(err);
            }else if(decoded){
                onVerified(err,decoded);
            }else{
                onVerified(new Error("Token no decodificado"));
            }
        });
    } else {
        onVerified(new Error("Token no recibido"));
    }
}