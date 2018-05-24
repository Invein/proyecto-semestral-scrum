const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');

function index(request, response, next) {
  pugLoader(response, 'view/index/index.pug');
};

function login(request, response, next) {
  pugLoader(response, 'view/index/login.pug');
};

module.exports = {
  index,
  login
};