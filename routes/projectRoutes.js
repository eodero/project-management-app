const express = require('express');
const router = express.Router();
const { protectRoute } = require('../controllers/authController');

const {
    createProject, 
    getAllProjects, 
    getProject, 
    updateProject, 
    deleteProject
} = require('../controllers/projectController');

router.route('/').post(protectRoute, createProject).get(protectRoute, getAllProjects);
router.route('/:id').patch(updateProject).get(getProject).delete(protectRoute, deleteProject);

module.exports = router;