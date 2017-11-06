//var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var properties = new mongoose.Schema({
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
  ownerPhone: String,
  ownerWeb: String,
  images: [String] // This is going to be a array of the image locations.  they will be stored somewhere
});


userSchema.methods.setPassword = function(password){
  
  this.salt = crypto.randomBytes(16).toString('hex');
  //console.log(this.salt);
  //console.log(password);
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
  console.log("setPassword Complted");
};

userSchema.methods.checkPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
  return this.hash == hash;
};

userSchema.methods.generateJwt = function(){
  var expire = new Date();
  expire.setDate(expire.getDate() + 7);
  return jwt.sign({
    _id: this._id, email: this.email, name: this.name, exp: parseInt(expire.getTime() / 1000)}, "MY_SECRET");
  
}



mongoose.model('User', userSchema, 'users');



