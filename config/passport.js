var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
require('bcrypt');
JWTstrategy = require('passport-jwt').Strategy;
ExtractJWT = require('passport-jwt').ExtractJwt;
var secret = process.env.PASSPORT_SECRET;


// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'user[username]',
      passwordField: 'user[password]',
      session: false
    },
    (username, password, done)=>{
      try {
        User.findOne({username: username}).then(user => {
          if(user === null) {
            console.log('Username already registered');
            return done(null, false, {message: 'Username already registered'});
          } else{
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              // Create user here
              console.log('User created');
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'user[username]',
      passwordField: 'user[password]',
      session: false
    },
    (username, password, done) => {
      try{
        User.findOne({email: email}).then(user =>{
          if(user === null){
            console.log('Username does not exist');
            return done(null, false, {message: 'Username does not exist'});
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if(reponse != true){
                console.log('Passwords do not match');
                return done(null, false, {message: 'Passwords do not match'});
              }
              console.log('User found and authenticated');
              return done(null, user);
            });
          }
        });
      }catch (err){
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: secret
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({username: jwt_payload.id}).then(user => {
          if(user) {
            console.log('User found in db');
            done(null, user);
          } else {
            console.log('User NOT found in db');
            done(null, false);
          }
      });
    } catch (err) {
      done(err);
    }
  }),
);


  // Useful for verify USER
//   function(email, password, done){
//
//   User.findOne({email: email}).then(function(user){
//     if(!user || !user.validPassword(password)){
//       return done(null, false, {errors: {'email and password': 'is invalid'}});
//     }
//     return done(null, user);
//   }).catch(done);
// }));
