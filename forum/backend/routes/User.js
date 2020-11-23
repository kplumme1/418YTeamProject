const express = require('express');
const fileUpload = require('express-fileupload')
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require("../config/keys");
const auth = require('../validation/auth');
const AWS = require('aws-sdk')
const app = express();
const fs = require('fs');
app.use(fileUpload());
const User = require('../models/User');
const Readable = require('stream').Readable;

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

// config aws
AWS.config.update({region: 'us-east-1'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

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
        User.findOne({username: name},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody : "Error has occured", msgError : true}})
        if(user)
            res.status(400).json({message: {msgBody : "Username is already taken.", msgError : true}})
        else{
            console.log("Valid:");
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
                role : "user",
                pfp : "",
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
                    role: user.role,
                    pfp: user.pfp
                }
                //sign the access key using the secret key and the payload and assign it to access key
                const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
                //response object of the access token
                res.status(200).json({accessToken: accessToken, username: user.username, role: user.role, pfp: user.pfp});
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

userRouter.get('/userInfo/:username', (req, res) => {
    const username = req.params.username
    //console.log("Got request: " + username);
    //console.log("Full request params: " + JSON.stringify(req.params));

    if (username == null) {
        return res.status(404).send("User not found");
    }

    User.findOne({username: username}).then(user => {
        if (!user) {
            return res.status(404).send("User not found");
        }
        //console.log("Found!");
         return res.status(200).json({username: user.username, role: user.role, pfp: user.pfp});
    });
});


userRouter.post('/updateUsername', (req, res) => {
    const newUsername = req.body.username;
    const newPFP = req.body.profilePicture;
    const userInfo = auth.verify(req);

    if (userInfo == null) {
        return res.status(400).send("Unauthorized!!");
    }
    var finalUsername = userInfo.username;
    const email = userInfo.email;
    if (newUsername != null) {
        if (newUsername.length > 16 || newUsername.length < 6) {
            console.log("Length username");
            return res.status(400).send("Username must be > 6 characters and < 16");
        }
        User.findOne({username: newUsername},(err,user)=>{
            if(err)
                return res.status(500).json({message: {msgBody : "Error has occured", msgError : true}})
            if(user) {
                console.log("This one");
                return res.status(400).json({message: {msgBody : "Username is already taken.", msgError : true}})
            }
            else{
                finalUsername = newUsername;
                User.findOne({email}).then(user => {
                    if (!user) {
                        return res.status(404).json({emailnotfound: "User not found."});
                    }
                    const userID = user._id;
            
                    //create the payload
                    const payload = {
                        userId: userID,
                        username: finalUsername,
                        email: user.email,
                        role: user.role,
                        pfp: user.pfp
                    }
                    user.username = finalUsername;
                    user.save().then(function(user) {
                        //console.log("User saved")
                        const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
                        //response object of the access token
                        res.status(200).json({accessToken: accessToken, username: user.username, role: user.role, pfp: user.pfp});
                        console.log("Updated profile username & Re-logged in");
                    }).catch(err => console.log(err));
                    //sign the access key using the secret key and the payload and assign it to access key
                    
                   
                    //res.status(200).send("OK");
                });
            }
        });
    }
});

function bufferToStream(buffer) { 
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);
  
    return stream;
  }

userRouter.post('/updatePFP', (req, res) => {
    console.log("GOT POST");
    const newUsername = req.body.username;
    const newPFP = req.body.profilePicture;
    const userInfo = auth.verify(req);

    if (userInfo == null) {
        return res.status(400).send("Unauthorized!!");
    }

    const email = userInfo.email;
    console.log("BODY: ");
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        console.log("NO files");
        return;
      }
    //console.log(req.files.pfp.name);
    //console.log(req.files.pfp.size);
    //console.log(req.files.pfp.tempFilePath);
    var uploadParams = {Bucket: process.env.AWS_BUCKET_NAME, Key: '', Body: ''};
    var file = req.files.pfp

    // Configure the file stream and obtain the upload parameters
    var fs = require('fs');
    /*
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
    console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    */
   uploadParams.Body = file.data;
    var path = require('path');
    uploadParams.Key = file.name; //path.basename(file);
    uploadParams.ACL = "public-read";

    // call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
        return res.status(400).send("Error");
    } if (data) {
        console.log("Upload Success", data.Location);
        const pfpLink = data.Location;
        User.findOne({email}).then(user => {
            if (!user) {
                return res.status(404).json({emailnotfound: "User not found."});
            }
            const userID = user._id;
    
            //create the payload
            const payload = {
                userId: userID,
                username: user.username,
                email: user.email,
                role: user.role,
                pfp: pfpLink
            }
            user.pfp = pfpLink;
            user.save().then(function(user) {
                //console.log("User saved")
                const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
                //response object of the access token
                res.status(200).json({accessToken: accessToken, username: user.username, role: user.role, pfp: user.pfp});
                console.log("Updated profile picture & Re-logged in");
            }).catch(err => console.log(err));
            //sign the access key using the secret key and the payload and assign it to access key
            
           
            //res.status(200).send("OK");
        });
        //return res.status(200).send("Success: " + data.Location);
    }
    });
    
    if (userInfo == null) {
        return res.status(400).send("Unauthorized!!");
    }
});

/*
@PostMapping(value = "/upload")
    public ModelAndView uploads3( @RequestParam(name = "name") String name, @RequestParam(name = "bio") String desc, @RequestParam("photo") MultipartFile image) {
        ModelAndView returnPage = new ModelAndView("error");
        System.out.println("description      " + desc);
        System.out.println(image.getOriginalFilename());
    
        BasicAWSCredentials cred = new BasicAWSCredentials(accesskey, secretkey);
        // AmazonS3Client client=AmazonS3ClientBuilder.standard().withCredentials(new
        // AWSCredentialsProvider(cred)).with
        AmazonS3 client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(cred))
                .withRegion(Regions.US_EAST_1).build();
        try {
            PutObjectRequest put = new PutObjectRequest(bucketName, image.getOriginalFilename(),
                    image.getInputStream(), new ObjectMetadata()).withCannedAcl(CannedAccessControlList.PublicRead);
            client.putObject(put);

			String imgSrc = "http://" + bucketName + ".s3.amazonaws.com/" + image.getOriginalFilename();
			User n = userRepository.findByEmail("s@no.com");
			n.setImgURL(imgSrc);
			if (!name.equals(null) && !name.equals("")){
				n.setName(name);
			}
			if (!desc.equals(null) && !desc.equals("")){
				n.setBio(desc);
			}
			userRepository.save(n);
			returnPage = new ModelAndView("home");
			returnPage.addObject("pfp", n.getImgURL());
			returnPage.addObject("name", n.getName());
			returnPage.addObject("bio", n.getBio());
           

            //Save this in the DB. 
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return returnPage;

    }
    */

module.exports = userRouter;