const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require("../config/keys");


const User = require('../models/User');

//input validation things
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const signToken = userID => {
	return JWT.sign({
		//testUser is secretorKey
		iss : "testUser",
		sub : userID
	}, "testUser", {expiresIn : "1h"});
}

//checks if user already exists and registers if not
userRouter.post('/register', (req,res)=>{
    const {errors, isValid} = validateRegisterInput(req.body);
    //dont think i need this anymore
    //const { username,email,password,role } = req.body;
    const name = req.body.name;
    User.findOne({email: req.body.email}).then((user) => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } else {
        User.findOne({name},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody : "Error has occured", msgError : true}})
        if(user)
            res.status(400).json({message: {msgBody : "Username is already taken.", msgError : true}})
        else{
            console.log("Vald:");
            console.log(isValid);
            if (isValid == false) {
                console.log(errors.email);
                console.log(errors.name);
                console.log(errors.password);
                return res.status(500).json({message: {msgBody : "Error has occured. Please try again.", msgError : true}});
            }
            
            const newUser = new User({
                username : req.body.name,
                email : req.body.email,
                password : req.body.password,
                role : req.body.role
                });
            //hashing passwords
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => res.status(200).send("OK"))
                .catch(err => console.log(err));
            });
            });
        }
    });
        }
    });	
});

userRouter.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    //authenticateToken(req,res);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found."});
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                //check to see if the user id is put in the payload here and consider putting role in payload too
                const userID = user._id;

                //create the payload
                const payload = {
                    userId: userID,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
                //sign the access key using the secret key and the payload and assign it to access key
                const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
                //response object of the access token
                res.status(200).json({accessToken: accessToken, username: user.username, role: user.role});
                console.log("Logged in");
                //res.status(200).send("OK");
                                
            } else {
                return res
                .status(400)
                .json({passwordIncorrect: "Password Incorrect"});
            }
        });
    });
    
    
});

/** old cookie attempt
userRouter.post('/login', passport.authenticate('local',{session : false}), (req,res)=> {
	if(req.isAuthenticated()){
		const {_id, username, role} = req.user;
		const token = signToken(_id);
		//httpOnly protects against javascript attacks same site protects against cross site request forgery  (to protect token)
		res.cookie('access_token',token,{httpOnly: true, sameSite: true});
		res.status(200).json({isAuthenticated: true, user : {username, role}})
	}
});
*/

//old logout function needs to be updated could not figure out how to "logout" with a jwt token without cookies
userRouter.get('/logout', passport.authenticate('jwt',{session : false}), (req,res)=> {
        res.clearCookie('access_Token');
        res.json({user:{username : "", role : ""}, success : true});
});


module.exports = userRouter;


