
var mongoose = require('mongoose');
var assert = require('assert');
var Property = mongoose.model('Property', mongoose.propertySchema, 'properties');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.postProperty = function(req, res) {
  
  var property = new Property();
  
  

  property.address = req.body.address;
  property.type = req.body.email;
  property.rent = req.body.rent;
  property.owner = req.body.owner;
  property.bedroom = req.body.bedroom;
  property.bathroom = req.body.bathroom;
  property.tenant = req.body.tenant;
  //property.
 
  
  
  property.save(function(err) {
    
    if (err) {
      console.log("Property Not written, error");
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


module.exports.propertyByType = function(req, res){

  if (req.body.type != null) { // Check if session exists
    
    // lookup the user in the DB by pulling their email from the session
    Property.find({ type: req.body.type }, function (err, property) {
      if(err){
        // all is the redirect if there is a bad search, it will
        // just return all properties in the database
        res.status(200);
        res.redirect('/all');
      }
      if (!property) {
        // all is the redirect if there is a bad search, it will
        // just return all properties in the database
        res.status(200);
        res.redirect('/all');
      }
     
      else {
        // As of now, the only thing that is being passed
        // is the array of objects that were found
        // cool beans

        res.status(200);
        
        res.json({
          
          "properties" : property
        });
      
      }
    });
  }
  else {
    
    res.status(200);
    res.redirect('/all');
  }
}
// this is a general result
module.exports.allProperties = function(req, res){
  
    
      
      // lookup the user in the DB by pulling their email from the session
      Property.find( function (err, property) {
        if(err){
          res.status(404);
        }
       
        else {
          //return the whole thing
  
          res.status(200);
          
          res.json({
            
            "properties" : property
          });
        
        }
      });
}