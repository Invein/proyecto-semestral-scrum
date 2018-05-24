const express = require('express');
const router = express.Router();
const users = require('./api/users');
const projects = require('./api/projects');

const verifyToken = require('../middlewares/securityMiddleware').verifyToken;


router.use('/users', verifyToken, users);
router.use('/projects', verifyToken, projects);

module.exports = router;
