var express = require('express');
var router = express.Router();
var studentController = require('../controllers/StudentController')

/* GET users listing. */
router.get('/', studentController.getAllStudent)
router.post('/', studentController.createStudent);
router.put('/information', studentController.updateStudentInformation);
router.post('/delete', studentController.deleteStudentInfomation)
router.get('/:mssv', studentController.getStudentWithMSSV);
router.put('/mark', studentController.updateStudentMark);
router.post('/mark', studentController.deleteStudentMark);

module.exports = router;    
