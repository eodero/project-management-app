const express = require('express');
const router = express.Router();

const {
    createUser, 
    getAllUsers, 
    getUser, updateUser, 
    deleteUser
} = require('../controllers/userController');

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').patch(updateUser).get(getUser).delete(deleteUser);

module.exports = router;