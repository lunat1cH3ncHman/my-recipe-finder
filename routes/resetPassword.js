var User = require("../models/user");

module.exports = app => {
  app.get('/reset', (req, res, next) => {
    console.log('Reset');

    User.findOne({resetPasswordToken: req.query.resetPasswordToken})
    .then (user => {
      console.log('Try to find one');
      if (user == null) {
        console.log('User is null');
        res.status(400).send('Something went wrong or reset link not valid');
      } else {
        console.log('User found');
        if(Date.now() < user.resetPasswordExpires){
          console.log('Reset link valid');
          res.status(200).send('Password reset valid');
        } else {
          console.log('Reset link expired');
          res.status(400).send('Sorry, that reset link has expired');
        }
      }
    });
  });
};
