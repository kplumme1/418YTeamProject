const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = userID => {
	return JWT.sign({
		//testUser is secretorKey
		iss : "testUser",
		sub : userID
	}, "testUser", {expiresIn : "1h"});
}

userRouter.post('/register', (req,res)=>{
    const { username,email,password,role } = req.body;
    User.findOne({email: req.body.email.toLowerCase()}, function (err) {
	if(err) {
	    return res.status(500).send("An unexpected error occured.");
		}
});
	if(user)
	    return res.status(400).send({message: "Email is already taken, try logging in"});
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody : "Error has occured", msgError : true}})
        if(user)
            res.status(400).json({message: {msgBody : "Username is already taken.", msgError : true}})
        else{
            const newUser = new User({username,email,password,role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message: {msgBody : "Error has occured", msgError : true}})
                else
                    res.status(201).json({message: {msgBody : "Account Successfully Created", msgError : false}})
            });
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


