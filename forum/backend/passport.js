const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User");
const keys = require("./config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

/*
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
*/

