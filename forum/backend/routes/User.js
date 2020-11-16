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
    User.findOne({email: req.body.email}.then(user => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } else {
        User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody : "Error has occured", msgError : true}})
        if(user)
            res.status(400).json({message: {msgBody : "Username is already taken.", msgError : true}})
        else{
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
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
            });
        }
    });
        }
    }));	
});

userRouter.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found."});
        }
    });

    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
            const payload = {
                id: user.id,
                name: user.name
            };

            JWT.sign({
                payload,
                iss: keys.secretOrKey,
            }, keys.secretOrKey,  {expiresIn: 614800}, (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            }); // 1 week in seconds
        } else {
            return res
            .status(400)
            .json({passwordIncorrect: "Password Incorrect"});
        }
    });
});

userRouter.post('/login', passport.authenticate('local',{session : false}), (req,res)=> {
	if(req.isAuthenticated()){
		const {_id, username, role} = req.user;
		const token = signToken(_id);
		//httpOnly protects against javascript attacks same site protects against cross site request forgery  (to protect token)
		res.cookie('access_token',token,{httpOnly: true, sameSite: true});
		res.status(200).json({isAuthenticated: true, user : {username, role}})
	}
});

userRouter.get('/logout', passport.authenticate('jwt',{session : false}), (req,res)=> {
        res.clearCookie('access_Token');
        res.json({user:{username : "", role : ""}, success : true});
});


module.exports = userRouter;


