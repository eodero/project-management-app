const Project = require('../models/projectModel');
const asyncWrapper = require('../utils/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors-handlers/index') 

const createProject = asyncWrapper (async (req, res) => {
  req.body.createdBy = req.user.userId
  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json({ project })
    });
    
const getAllProjects = asyncWrapper (async (req, res) => {
  const projects = await Project.find({
    createdBy: req.user.userId,
  }).sort('createdAt');
  
    res.status(StatusCodes.OK).json({
          projects,
          count: projects.length
          
    })
  });
    
const getProject = asyncWrapper (async (req, res) => {
  
  const project = await Project.findById(req.params.id);
  if(!project) {
    throw new NotFoundError(`No project with id ${projectID}`);
  }
    res.status(StatusCodes.OK).json({
      project
      });
    });

const updateProject = asyncWrapper(async (req, res) => {
  // const{ 
  //   body: {task, dueDate, assignedTo, description},
  //   user: {userId},
  //   params: {id: projectId}
  // } = req;
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if(!project) {
    throw new NotFoundError('No project with that id', 404);
  }
  res.status(StatusCodes.OK).json({ 
    status: 'success',
    data: {
      project
    ,} 
   });
  });

const deleteProject = asyncWrapper (async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if(!project) {
    throw new NotFoundError('No project with id', 404);
  };
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
};