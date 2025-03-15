const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Import routers
const authRouter = require('./controllers/auth');
const appointmentRouter = require('./controllers/appointments')
const userRouter = require('./controllers/user')
const reviewRouter = require('./controllers/reviews')

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use('/auth', authRouter);
app.use('/appointment', appointmentRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
