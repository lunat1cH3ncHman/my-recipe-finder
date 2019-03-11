var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = process.env.PASSPORT_SECRET;

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true,"can't be blank"], match:[/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  // TODO: can work this so it's compulsory in passport required: [true,"can't be blank"] and unique:true
  // email: {type: String, lowercase: true, unique: true, index: true, required: [true, "can't be blank"], match: [/\S+@+\.\S+/, 'isinvalid'], index: true},
  email: {type: String, lowercase: true, match: [/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'isinvalid']},
  password: String,
  bio: String,
  image: String,
  has: String,
  salt: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
  var hash = pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function(){
  return{
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

module.exports = mongoose.model('User', UserSchema);
