var express = require('express');
var router = express.Router();
var loginController = require('../controllers/LoginController')

router.post('/account-login', loginController.accountLogin)
router.get('/', loginController.getAllAccount)
router.post('/create', loginController.createAccount)

module.exports = router