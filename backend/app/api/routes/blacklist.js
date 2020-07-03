const express = require('express');
const router = express.Router();
const blacklistController = require('../controllers/blacklist');
const checkAuth = require('../middleware/check-auth');
const permission = require('../middleware/check-permission');

router.post('/add', blacklistController.add);
router.post('/check', blacklistController.check);
router.post('/delete', checkAuth, permission.permissions(permission.SYSTEM), blacklistController.delete);
router.get('/all', checkAuth, permission.permissions(permission.SYSTEM), blacklistController.all);
module.exports = router;