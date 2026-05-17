const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/clients', auth, adminAuth, authController.getClients);

module.exports = router;