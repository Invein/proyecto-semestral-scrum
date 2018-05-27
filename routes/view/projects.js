const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/view/projectsCtrl');

router.get('/', projectsCtrl.index);
router.get('/new', projectsCtrl.create);
router.get('/:id', projectsCtrl.viewOne);

module.exports = router;
