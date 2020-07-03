const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const permission = require('../middleware/check-permission');

router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);
router.delete('/delete', checkAuth, permission.permissions(9999), userController.user_delete);
router.post('/change_password', checkAuth, userController.user_pwd_change);

module.exports = router;