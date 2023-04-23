const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../utils/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, CustomAPIError } = require('../errors-handlers/index');

const signToken = (id) => (
    jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
);

const createSendToken = (user,statusCode, res) => {
    const token = signToken(user._id);
    res.status(statusCode).json({
        status: 'success',
        token,
        data:{
            user
        }
    })
};


const register = asyncWrapper (async (req, res, next) => {
    const user = new User(req.body);
    await user.save();
    
    createSendToken(user, 201, res);
    
});

const login = asyncWrapper( async(req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password) {
        return next(new BadRequestError('Please provide email and password'));
    }
    
    console.log('Email', email);
    console.log('Password', password);
    
    
    const user = await User.findOne({ email, }).select('+password');
    console.log(user);
    
    if(!user ) {
        throw new UnauthenticatedError('Invalid email or password');
    }
    const isPasswordCorrect = await user.correctPassword(password, user.password);
    console.log('isPasswordCorrect', isPasswordCorrect)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid email or password');
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
})

const protectRoute = asyncWrapper(async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        
        if(!token) {
            return next(
                new CustomAPIError('You are not authorized to access this page. Please log in to access the page.', 401)
            )
        }
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const refreshedUser = await User.findById(decoded.id);
    if(!refreshedUser){
        return next(new CustomAPIError('The user no longer exist', 401))
    }
  
    req.user = refreshedUser;
    next();
})
module.exports = {
    register,
    login,
    protectRoute
};