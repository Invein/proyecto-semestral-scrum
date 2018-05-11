var express = require('express');
var router = express.Router();
const projecstCtrl = require('../controllers/projectCtrl')

/* GET users listing. */
router.get('/', projecstCtrl.index);
router.post('/', projecstCtrl.create);

module.exports = router;
