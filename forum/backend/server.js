const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to mongo server cluster
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//load routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/boards', boardsRouter);

//start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

