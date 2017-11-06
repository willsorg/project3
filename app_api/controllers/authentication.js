var passport = require('passport');
var mongoose = require('mongoose');
var assert = require('assert');
var User = mongoose.model('User', mongoose.userSchema, 'users');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  
  var user = new User();
  
  

  user.name = req.body.name;
  user.email = req.body.email;
  
 
  user.setPassword(req.body.password);
  
  user.save(function(err) {
    
    if (err) {
      console.log("Not written, error");
      console.log(err);
      
    }
    else{
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
    }
    
  });
  
};
var returnedUser;
var returnedEmail;
module.exports.login = function(req, res){
  //console.log("login called with paramerters" + req.body.email + req.body.password);
  User.findOne({ "email": req.body.email}).exec()
    .catch(function(err) {
    console.log("error " + err);
  })
  .then(function(users) {
    //console.log("Here is the users Return . . .   " + users);
    //console.log("Inner Email = " + users.email);
    if(users.email != null){
      //console.log("no null vals");
    if(users.checkPassword(req.body.password)){
      //console.log("here");
      //req.session.email = req.body.email;
      //req.session.salt = users.salt;
      var time = Date.now();
      var date = new Date(time);
      users.logins.push(date.toString());
      users.save();
      var token;
      //console.log("a");
      token = users.generateJwt();
      //console.log("b");
      res.status(200);
      //console.log(users.logins);
      //res.addHeader("Set-Cookie", ["session" = "goodCookie"]);
      res.json({
      "token" : token,
      "history" : users.logins,
      
      
      });
      console.log("login auth copleted - calling profile redirect");
      
      //res.redirect('/homepage/homepage.html');
      //onsole.log("completed");
      
    }
    else{
      console.log("password incorrect - The console can't save you now!");
    
      res.status(404);
      res.json({
      "token" : "incorrect password"
      });
  }
  }
  });
};


module.exports.changePassword = function(req, res){
  console.log("This was called");
  //console.log("login called with paramerters" + req.body.email + req.body.password);
  User.findOne({ "email": req.body.email}).exec()
    .catch(function(err) {
    console.log("error " + err);
  })
  .then(function(users) {
    //console.log("Here is the users Return . . .   " + users);
    //console.log("Inner Email = " + users.email);
    console.log("A");
    if(users.email != null){
      console.log("B");
      //console.log("no null vals");
    if(users.checkPassword(req.body.password)){
      console.log("C");
      users.setPassword(req.body.newPassword);
      console.log("D");
      users.save();
      console.log("E");
      var token;
     
      token = users.generateJwt();
      
      res.status(200);
    
      res.json({
      "token" : token,
      "success" : true,
      
      
      });
      console.log("login auth copleted - calling profile redirect");
      
      //res.redirect('/homepage/homepage.html');
      //onsole.log("completed");
      
    }
    else{
      console.log("password incorrect - The console can't save you now!");
    
      res.status(404);
      res.json({
      "token" : "incorrect password"
      });
  }
  }
  });
};










