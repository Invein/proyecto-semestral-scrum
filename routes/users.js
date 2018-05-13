var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/usersCtrl')

router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create);

module.exports = router;
