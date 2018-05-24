var express = require('express');
var router = express.Router();
const projecstCtrl = require('../../controllers/api/projectsCtrl')

/* GET users listing. */
router.get('/', projecstCtrl.index);
router.post('/', projecstCtrl.create);
router.put('/:id', projecstCtrl.update);
router.delete('/:id', projecstCtrl.remove);

module.exports = router;
