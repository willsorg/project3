var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');



var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.post('/profile', ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/change', ctrlAuth.changePassword)


router.get('/logout', function(req, res) {
  
  res.redirect('/');
});

module.exports = router;