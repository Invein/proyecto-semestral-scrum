const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/usersCtrl');

router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create);

module.exports = router;