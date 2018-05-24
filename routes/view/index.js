const express = require('express');
const router = express.Router();
const indexCtrl = require('../../controllers/view/indexCtrl');

router.get('/login', indexCtrl.login);
router.get('/', indexCtrl.index);

module.exports = router;