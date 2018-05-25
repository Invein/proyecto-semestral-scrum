const express = require('express');
const router = express.Router();
const users = require('./view/users');
const index = require('./view/index');
const verifyTokenOnViews = require('../middlewares/securityMiddleware').verifyTokenOnViews;

router.use('/', index);
router.use('/users',verifyTokenOnViews, users);

module.exports = router;