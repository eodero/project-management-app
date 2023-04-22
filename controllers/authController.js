const User = require('../models/userModel');
const asyncWrapper = require('../utils/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors-handlers/index');

const register = asyncWrapper (async (req, res, next) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token })
});

const login = asyncWrapper( async(req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    
    const user = await User.findOne({ email });
    if(!user) {
        throw new BadRequestError('')
    }
})

module.exports = register;