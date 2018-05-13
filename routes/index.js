var express = require('express');
var router = express.Router();
const indexCtrl = require('../controllers/indexCtrl');

/* GET home page. */
router.get('/', indexCtrl.index);

router.post('/login', indexCtrl.login);

module.exports = router;
