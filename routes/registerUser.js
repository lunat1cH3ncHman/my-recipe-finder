const passport = require('passport');
const User = require("../models/user");

// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

module.exports = app => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            email: req.body.email,
            username: user.username,
          };
          User.findOne({username: data.username}).then(user => {
            user.update({
              email: data.email,
            })
            .then(() => {
              console.log('User created in db');
              res.status(200).send({message: 'User created'});
            });
          });
        });
      }
    })(rerq,res,next);
  });
};
