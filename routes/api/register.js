const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/usersCtrl');

router.post('/register',usersCtrl.register);

module.exports = router;