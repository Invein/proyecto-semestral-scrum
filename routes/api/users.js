const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/usersCtrl');

router.get('/', usersCtrl.index);

module.exports = router;