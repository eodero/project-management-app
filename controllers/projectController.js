const Project = require('../models/projectModel');
const asyncWrapper = require('../utils/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors-handlers/index') 

const createProject = asyncWrapper (async (req, res) => {
  req.body.createdBy = req.user.userId
  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
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
  
  const { user: { userId }, params: { id: projectId } } = req
  const project = await Project.findOne({ _id: projectId,
  createdBy: userId });
  
  if(!project) {
    throw new NotFoundError(`No project with id ${projectID}`);
  }
    res.status(StatusCodes.OK).json({
      project
      });
    });

const updateProject = asyncWrapper(async (req, res) => {
  const{ 
    body: {task, dueDate, assignedTo, description},
    user: {userId},
    params: {id: projectId}
  } = req;
  
  if (task === '' || dueDate === '' || assignedTo === '' || description === '') {
    throw new BadRequestError('All fields must be provided');
  }
  
  const project = await Project.findByIdAndUpdate({_id: projectId, createdBy: userId}, req.body, {new: true, runValidators:true});
  
  if(!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }
  res.status(StatusCodes.OK).json({ project });
   });

const deleteProject = asyncWrapper (async (req, res) => {
  const { user: { userId }, params: { id: projectId } } = req
  
  const project = await Project.findByIdAndRemove({_id: projectId, createdBy: userId});
  
  if(!project) {
    throw new NotFoundError(`No project with id ${projectID}`);
  };
  res.status(StatusCodes.OK).send();
});

module.exports = {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
};