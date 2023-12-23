var express = require('express');
var router = express.Router();
var studentController = require('../controllers/StudentController')

/* GET users listing. */
router.get('/', studentController.getAllStudent)
router.get('/:mssv', studentController.getStudentWithMSSV);

module.exports = router;
