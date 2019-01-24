const passport = require('passport');
const User = require("../models/user");
const Data = require("../models/data");

// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

module.exports = app => {
  app.get('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          User.findOne({username: data.username}).then(user => {
            const token = jwt.sign({ id: user.username }, jstSecret.secret);
            res.status(200).send({
              auth: true,
              token: token,
              message: 'User found and logged in',
            });
          });
        });
      }
    })(req, res, next);
  });
};