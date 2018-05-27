const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/view/projectsCtrl');

router.get('/', projectsCtrl.index);

module.exports = router;