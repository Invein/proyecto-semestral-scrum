const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

function verifyToken(request, response, next) {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.get('api.key'), (err, decoded) => {
      if (err) {
        response.json({
          error: true,
          message: 'Llave incorrecta',
          objs: {}
        });
      } else {
        next();
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Llave incorrecta',
      objs: {}
    });
  }
}

module.exports = {
  verifyToken
};
