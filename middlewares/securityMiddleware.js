const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');

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

function verifyTokenOnViews(request, response, next) {
  const token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers.token;
  if (token) {
    jwt.verify(token, config.get('api.key'), (err, decoded) => {
      if (err) {
        response.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    response.redirect('/login');
  }
}

module.exports = {
  verifyToken,
  verifyTokenOnViews
};
