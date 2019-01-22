const passport = require('passport');

// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

module.exports = app => {
  app.get('/finduser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if(err) {
        console.log(err);
      }
      if (info != undefined){
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log('User authenticated');
        res.status(200).send({
          auth: true,
          email: user.email,
          username: user.username,
          message: 'User found in db',
        });
      }
    })(req, res, next);
  });
};
