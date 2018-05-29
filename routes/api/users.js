var express = require('express');
var router = express.Router();
const usersCtrl = require('../../controllers/api/usersCtrl')

router.get('/', usersCtrl.index);
router.put('/', usersCtrl.update);
router.put('/skills', usersCtrl.putSkill);
router.delete('/:id', usersCtrl.remove);
router.delete('/skills/:skillID',usersCtrl.removeSkill);


module.exports = router;
