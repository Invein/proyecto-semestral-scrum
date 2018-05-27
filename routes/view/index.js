const express = require('express');
const router = express.Router();
const indexCtrl = require('../../controllers/view/indexCtrl');
const verifyTokenOnViews = require('../../middlewares/securityMiddleware').verifyTokenOnViews;

router.get('/', verifyTokenOnViews, indexCtrl.index);
router.get('/login', indexCtrl.login);
router.get('/register', indexCtrl.register);

module.exports = router;