const JWT = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    verify: function(req) {
        const authHeader = req.headers['token'];
        const token = authHeader;
        //const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (token == null) 
        return null;
    
        return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if (err)
           return null;
    
            req.user = user;
            console.log("Authenticated");
            return user.userId;
            //console.log(user); // is a table and has userId... gotta figure
            var found;
            
            //next();
        });
    }    
}