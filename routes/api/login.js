const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/usersCtrl');

router.post('/login',usersCtrl.login);

module.exports = router;