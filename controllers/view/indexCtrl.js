const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const getId = require('../../util/lib/getIdFromToken');
const User = require('../../models/user');

function index(request, response, next) {
  getId(request, (err, userID) => {
    User.findById(userID, (err, user) => {
      if (err) {
        response.json({ error });
      } else {
        if (user) {
          pugLoader(response, 'view/index/index.pug', { user });
        } else {
          response.json({ error: true, message: "No se encontró el usuario" });
        }
      }
    });
  });
};

function login(request, response, next) {
  pugLoader(response, 'view/index/login.pug');
};

function register(request, response, next) {
  pugLoader(response, 'view/index/register.pug');
};


module.exports = {
  index,
  login,
  register
};