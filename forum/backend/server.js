const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//connect to mongo server cluster
/*
const atlas_uri = 'mongodb+srv://' 
                    + process.env.ATLAS_USER 
                    + ':' + process.env.ATLAS_PASS 
                    + '@' + process.env.ATLAS_CLUSTER 
                    + '/' + process.env.ATLAS_DB
                    + '?' + process.env.ATLAS_SETTINGS;
mongoose.connect(atlas_uri, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true},()=>{
//mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true},()=>{
*/
mongoose.connect('mongodb+srv://sujames:VIG0xH7s2JLanipm@cluster0.aqznf.gcp.mongodb.net/testDB?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});
/* test hashing
const User = require('./models/User');

const userInput = {
    username : "testUser",
    password : "12345678",
    role : "admin"
}

const user = new User(userInput);
user.save((err,document)=>{
    if(err)
        console.log(err);
    console.log(document);
});
*/
//load routes



const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/User');
const boardsRouter = require('./routes/boards');
const topicsRouter = require('./routes/topics');
const postRouter = require('./routes/posts');
app.use('/exercises', exercisesRouter);
app.use('/user', userRouter);
app.use('/boards', boardsRouter);
app.use('/topics', topicsRouter);
app.use('/posts', postRouter);
app.use(passport.initialize());

require("./passport") (passport);

//start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

