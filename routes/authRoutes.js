const express = require('express');
const router = express.Router();

const register = require('../controllers/authController');

router.post('/register', register);
// router.route('/:id').get(getUser);

module.exports = router;