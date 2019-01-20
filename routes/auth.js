const express = require('express');
const router = express.Router();
const jwt = require ('jsonwebtoken');
const passport = require("passport");

// this is our user loginmethod
// passport authentication, don't save user in session, use minimum info
router.post('/login', function(req, res, next){
  passport.authentication('local', {session: flase}, (err, user, info) =>{
    if(err || !user){
      return res.status(400).json({
        message: 'Seomthing is not right',
        user: user
      });
    }
    req.login(user, {session: false}, (err) =>{
      if (err) {
        res.sender(err);
      }
      // generate a signed json web token with the contants user object and
      // return it in the response
      const token = jwt.sign(user, secret);
      return res.json({user, token});
    });
  })(req, res);
});

module.exports = router;
