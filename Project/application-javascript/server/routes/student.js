'use strict';
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');

/* GET users listing. */
router.get('/', studentController.getAllStudent);
router.get('/:mssv', studentController.getStudentWithMSSV);
router.post('/', studentController.createStudent);
router.put('/information', studentController.updateStudentInformation);
router.post('/mark', studentController.insertStudentMark);
router.put('/mark', studentController.updateStudentMark);
router.delete('/mark', studentController.deleteStudentMark);

module.exports = router;
