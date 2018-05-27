const express = require('express');
const router = express.Router();
const users = require('./view/users');
const index = require('./view/index');
const projects = require('./view/projects');
const verifyTokenOnViews = require('../middlewares/securityMiddleware').verifyTokenOnViews;


router.use('/', index);
router.use('/users', verifyTokenOnViews, users);
router.use('/projects',verifyTokenOnViews, projects);

module.exports = router;