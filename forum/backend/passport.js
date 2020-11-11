const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

//used for authorization a.k.a accessing protected endpoints like admin stuff 
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "testUser"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err, user)=>{
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
    });
}));

//authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username}, (err,user)=>{
        //something wrong with database
        if(err)
            return done(err);
        //if no user found
        if(!user)
            return done(null, false);
        //checks if password matches see User.js
        user.comparePassword(password, done);
    });
}));
