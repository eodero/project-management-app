const express = require('express');
const router = express.Router();

const {
    createProject, 
    getAllProjects, 
    getProject, updateProject, 
    deleteProject
} = require('../controllers/projectController');

router.route('/').post(createProject).get(getAllProjects);
router.route('/:id').patch(updateProject).get(getProject).delete(deleteProject);

module.exports = router;