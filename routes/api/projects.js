var express = require('express');
var router = express.Router();
const projecstCtrl = require('../../controllers/api/projectsCtrl')

/* GET users listing. */
router.get('/', projecstCtrl.index);
router.post('/', projecstCtrl.create);
router.put('/:id', projecstCtrl.update);
router.delete('/:id', projecstCtrl.remove);
router.put('/:projectID/teamMembers', projecstCtrl.putTeamMember);
router.delete('/:projectID/teamMembers/:memberID', projecstCtrl.deleteTeamMember);
router.put('/:projectID/productBacklog', projecstCtrl.putProductBacklog);
router.delete('/:projectID/productBacklog/:historyID', projecstCtrl.deleteProductBacklog);

module.exports = router;
