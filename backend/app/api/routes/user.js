const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);
router.delete('/delete', checkAuth, userController.user_delete);
router.post('/change_password', checkAuth, userController.user_pwd_change);

module.exports = router;