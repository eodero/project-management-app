const express = require('express');
const router = express.Router();

const getAllUsers = require('../controllers/userController');
const { register, login } = require('../controllers/authController')

router.route('/').get(getAllUsers)
router.post('/register', register);
router.post('/login', login);

module.exports = router;