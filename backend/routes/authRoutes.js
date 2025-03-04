const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const {getActiveProjects } = require('../controllers/getChartData')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.get('/active-projects', getActiveProjects);

module.exports = router;
