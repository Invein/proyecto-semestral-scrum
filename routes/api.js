const express = require('express');
const router = express.Router();
const users = require('./api/users');
const projects = require('./api/projects');
const login = require('../controllers/api/loginCtrl');
const register = require('../controllers/api/registerCTRL');
const verifyToken = require('../middlewares/securityMiddleware').verifyToken;

router.use('/login', login);
router.use('/users', verifyToken, users);
router.use('/projects', verifyToken, projects);
router.use('/register', register.user);

module.exports = router;
