const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload')

require('dotenv').config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

//connect to mongo server cluster - old lines of code are commented out but kept for now until testing complete.
//atlas_uri now builds the fully qualified uri from individual parts, making it easier to edit the .env file

const atlas_uri = 'mongodb+srv://' 
                    + process.env.ATLAS_USER 
                    + ':' + process.env.ATLAS_PASS 
                    + '@' + process.env.ATLAS_CLUSTER 
                    + '/' + process.env.ATLAS_DB
                    + '?' + process.env.ATLAS_SETTINGS;
mongoose.connect(atlas_uri, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true},()=>{ // ORIGINAL
//mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true},()=>{



//mongoose.connect('mongodb+srv://shawnyg:djul3kfk6TqtbQ31@cluster0.sv7sa.mongodb.net/<testDB>?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true},()=>{
//mongoose.connect('mongodb+srv://sujames:VIG0xH7s2JLanipm@cluster0.aqznf.gcp.mongodb.net/testDB?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true},()=>{
//mongoose.connect('mongodb+srv://sujames:VIG0xH7s2JLanipm@cluster0.aqznf.gcp.mongodb.net/testDB?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true},()=>{

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



//const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/User');
const boardsRouter = require('./routes/boards');
const topicsRouter = require('./routes/topics');
const postRouter = require('./routes/posts');
const threadRouter = require('./routes/threads');
//app.use('/exercises', exercisesRouter);
app.use('/user', userRouter);
app.use('/boards', boardsRouter);
app.use('/topics', topicsRouter);
app.use('/posts', postRouter);

app.use(passport.initialize());

require("./passport") (passport);
app.use('/threads', threadRouter);


//start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

