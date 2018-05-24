const express = require('express');
const router = express.Router();
const users = require('./view/users');
const index = require('./view/index');

router.use('/', index);
router.use('/users', users);

module.exports = router;