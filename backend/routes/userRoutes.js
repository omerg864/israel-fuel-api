const express = require('express');
const { registerUser, loginUser, getUser, generateNewAPIToken, verifyUser } = require('../controllers/userController');
const {protectUser} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/me', protectUser, getUser);

router.get('/generate/new/Token', protectUser, generateNewAPIToken);

router.get('/verify/:token', verifyUser);

module.exports = router;