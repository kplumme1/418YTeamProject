const JWT = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    getUser: function(userId) {
        return User.findOne({_id: userId}).then(user => {
            if (!user) {
                console.log("Couldn't find user?");
                return null;
                //;return res.status(404).json({emailnotfound: "Email not found."});
            }
            return {user: user.username, email: user.email, role: user.role};
        });
    }    
}