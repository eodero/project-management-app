const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../utils/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, CustomAPIError } = require('../errors-handlers/index');

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
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    };
    
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
    // if (refreshedUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //       new CustomAPIError(
    //         'The user recently changed password, please log in again',
    //         401
    //       )
    //     );
    //   }
  
    req.user = refreshedUser;
    next();
})
module.exports = {
    register,
    login,
    protectRoute
};