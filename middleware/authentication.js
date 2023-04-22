const jwt = require('jsonwebtoken');
const asyncWrapper = require('../utils/asyncWrapper');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError } = require('../errors-handlers/index');

const auth = asyncWrapper (async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    } 
    
    const token = authHeader.split(' ')[1];
    
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = { userId: payload.userId,name: payload.name };
    next(error);
})

module.exports = auth;
