const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const jstSecret = process.env.PASSPORT_SECRET;

// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

module.exports = app => {
  app.post('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else if (info != undefined) {
        console.log(info.message);
        res.status(400).send(info.message);
      } else {
        req.logIn(user, err => {
          if (err) {
            console.log('Could not login user');
            return res.status(400).send('Sorry something went wrong please try again');
          } else {
            User.findOne({username: user.username}).then (user => {
              const token = jwt.sign({ id: user.username }, jstSecret);
              res.status(200).send({
                auth: true,
                token: token,
                message: 'User found and logged in',
              });
            });
          }
        });
      }
    })(req, res, next);
  });
};
