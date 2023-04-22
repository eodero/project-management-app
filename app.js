require('dotenv').config()
const morgan = require('morgan');

const express = require('express');
app = express();

//security
//connect to mongodb
const connectDB = require('./db/connect');
//authentication

// middleware
app.use(express.json());
app.use(morgan('dev'));

//routers
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

//error handlers

//routes
app.use('/api/v1/projects',projectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);



const port = process.env.PORT || 3000;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      console.log('database successfully connected...');
      app.listen(port, () => {
         console.log(`Server is listening on ${port}....`);
      })
   } catch (error) {
      console.log(error)
   }

};

start();