var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/usersCtrl')

router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.remove);
router.put('/:userId/skills', usersCtrl.putSkill);
router.delete('/:userId/skills/:skillId',usersCtrl.removeSkill);


module.exports = router;
