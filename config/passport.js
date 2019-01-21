var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      session: false
    },
    (username, password, done)=>{
      try{
        User.findOne({email: email}).then(user =>{
          if(user === null){
            console.log('Email already registered');
            return done(null, false, {message: 'Email already registered'});
          } else{
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              // Create user here
              console.log('User creared');
              return done(null, user);
            });
          }
        });
      }catch (err){
        done(err);
      }
    },
  },
};

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      session: false
    },
    (username, password, done) => {
      try{
        User.findOne({email: email}).then(user =>{
          if(user === null){
            console.log('Email already registered');
            return done(null, false, {message: 'Email'});
          } else{
            bcrypt.compare(password, user.password).then(response => {
              if(reponse != true){
                console.log('Passwords do not match');
                return done(null, false, {message: 'passwords do not match'});
              }
              console.log('User found and authenticated');
              return done(null, false);
            });
          }
        });
      }catch (err){
        done(err);
      }
    },
  },
};

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScehme('JWT'),
  secretOrKey: jwtSecret.secret
};

passport.use(
  'jwt',
  new JWTStrategy(jwt_payload, done) => {
    try {
      User.findOne({email: jwt_payload.id}).then(user => {
          if(user) {
            console.log('User found in db passport');
            done(null, user);
          } else {
            console.log('User NOT found in db passport');
            done(null, false);
          }
        });
    } catch (err) {
      done(err);
    }
  }),
};


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
