var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res){
  // No Id return 401
 //console.log("/api/profile called");
  //console.log("History = " + req.body.history);
  //console.log("Email = " + req.body.email);
  if (req.body.history != null && req.body.email != null) { // Check if session exists
    
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.body.email }, function (err, user) {
      if(err){
        //console.log("A");
        //alert("Profile Read Error");
        //console.log("profileRead Error");
        res.status(200);
        res.redirect('/login/login.html');
      }
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        //req.session.reset();
       // console.log("B");
        //alert("Bad Call to profile!");
        res.status(200);
        res.redirect('/login/login.html');
      }
     
      else {
        // expose the user to the template
        //console.log("Correct path taken");
        var newHTML = "";
        //console.log(req.body.history);
        var histArray = req.body.history.split(",");
        //console.log(histArray);

        for(var i = 0; i < histArray.length; i++){
          newHTML +=  "<li>" + histArray[i] + "</li>";
        }
        res.status(200);
        // render the dashboard page
        //res.redirect('/homepage/homepage.html');
        res.json({
          
          "history" : newHTML
        });
      
      }
    });
  }
  else {
    //console.log("D");
    //alert("Bad Call 2 to profile!");
    res.status(200);
    res.redirect('/login/login.html');
  }
}
