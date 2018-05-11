var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/usersCtrl')

/* GET users listing. */
router.post('/', usersCtrl.create);

module.exports = router;
