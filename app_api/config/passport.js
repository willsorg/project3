var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done){
    User.findOne({email: username}, function (err, user){
        if(err) { return done(err);}
        // User does not exist
        if(!user){
            return done(null, false, {
                message: 'User does not exist'
            });
        }
        // If password is wrong
        if (!user.validPassword(password)){
            return done(null, false, {
                message: 'Incorrect Password'
            });
        }
        // If correct
        return done(null, user);
    });
}
));
