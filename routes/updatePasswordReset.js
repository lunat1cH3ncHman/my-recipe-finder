const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const BCRYPT_SALT_ROUNDS = 12;

module.exports = app => {
  app.put('/updatePasswordReset', (req, res, next) => {
    console.log('updatePasswordReset');
    User.findOne({resetPasswordToken: req.body.resetPasswordToken}).then( user => {
      if (user == null) {
        console.log('User is null');
        res.status(400).send('Something went wrong or reset link not valid');
      } else {
        console.log('user exists in db');
        bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.resetPasswordToken = null,
          user.resetPasswordExpires = null,
          user.save(err => {
            if (err){
              console.log(`Password update error ${err}`);
              res.status(400).send('Sorry, something went wrong, please try again later');
            } else {
              console.log('Password updated');
              res.status(200).send('password updated');
            }
          });
        });
      }
    });
  });
};
