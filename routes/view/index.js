const express = require('express');
const router = express.Router();
const indexCtrl = require('../../controllers/view/indexCtrl');
const verifyTokenOnViews = require('../../middlewares/securityMiddleware').verifyTokenOnViews;

router.get('/login', indexCtrl.login);
router.get('/register', indexCtrl.register);
router.get('/', verifyTokenOnViews, indexCtrl.index);

module.exports = router;