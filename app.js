require('dotenv').config()
const morgan = require('morgan');

//security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser')

const express = require('express');
app = express();

//connect to mongodb
const connectDB = require('./db/connect');

//authentication
// const authenticateUser = require('./middleware/authentication');

//routers
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');

//error handlers
const notFoundMiddleWare = require('./middleware/not-found');
// const errorHandlerMiddlerWare = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
   rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 100,
   })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(xss());

//swagger

//routes
app.use('/api/v1/projects',projectRouter);
app.use('/api/v1/users', userRouter);

//error handler middleware
app.use(notFoundMiddleWare);
app.use(notFoundMiddleWare);

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