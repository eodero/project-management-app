require('dotenv').config()
const morgan = require('morgan');

const express = require('express');
app = express();

//security
//connect to mongodb
//authentication

// middleware
app.use(express.json());
app.use(morgan('dev'));

//routers
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
//routes
app.use('/api/v1/projects',projectRouter);
app.use('/api/v1/users',userRouter);

//error handlers

const port = process.env.PORT || 3000;

const start = async () => {
 app.listen(port, () => {
    console.log(`Server is listening on ${port}....`);
 })
};

start();