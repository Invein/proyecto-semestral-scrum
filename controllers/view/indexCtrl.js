const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');

function index(request, response, next) {
  pugLoader.renderWithUser(request, response, 'view/index/index.pug');
};

function login(request, response, next) {
  pugLoader.render(request, response, 'view/index/login.pug');
};

function register(request, response, next) {
  pugLoader.render(request, response, 'view/index/register.pug');
};


module.exports = {
  index,
  login,
  register
};