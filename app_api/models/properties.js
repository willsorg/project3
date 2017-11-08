//var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  bedrooms: Number,
  bathrooms: Number,
  tenants: Number,
  
  //images: [String] // This is going to be a array of the image locations.  they will be stored somewhere
});




userSchema.methods.generateJwt = function(){
  var expire = new Date();
  expire.setDate(expire.getDate() + 7);
  return jwt.sign({
    _id: this._id, address: this.address, owner: this.owner, exp: parseInt(expire.getTime() / 1000)}, "MY_SECRET");
  
}



//mongoose.model('User', userSchema, 'users');



