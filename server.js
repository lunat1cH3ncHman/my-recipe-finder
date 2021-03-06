
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
require('dotenv').config();
require('./models/user');
const passport = require('passport');
require('./config/passport');
var jwt = require('express-jwt');
var secret = process.env.PASSPORT_SECRET;

const API_PORT = 3001;
const app = express();
const router = express.Router();
const path = require('path');

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else
      next()
    })
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------------
//TODO: Is this still needed ? Handle decoding JWT's
//-----------------------------------------

function getTokenFromHeaders(req){
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token'){
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeaders
  })
};

//-----------------------------------------
//Mongoose Settings
//-----------------------------------------

app.use((req, res, next) => {
  console.log("use for mongoose callback");
  if (mongoose.connection.readyState) {
    console.log("if (mongoose.connection.readyState)");
    next();
  } else {
    console.log("else (mongoose.connection.readyState)");
    require("./mongo")().then(() => next());
    console.log("else (mongoose.connection.readyState)");
  }
});

let db = mongoose.connection;

db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

require('./routes/registerUser')(app);
require('./routes/loginUser')(app);
require('./routes/findUser')(app);
require('./routes/addRecipe')(app);
require('./routes/getRecipe')(app);
require('./routes/getRecipes')(app);
require('./routes/editRecipe')(app);
require('./routes/updateRecipe')(app);
require('./routes/deleteRecipe')(app);
require('./routes/forgotPassword')(app);
require('./routes/resetPassword')(app);
require('./routes/updatePasswordReset')(app);
app.get('*', (req, res) => res.sendFile(path.resolve('client/build', 'index.html')));


// Setup server
const port = process.env.PORT || process.argv[2] || API_PORT;
const host = "localhost";

console.log(`Port: ${port}\n`);

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`LISTENING: http://${host}:${port}\n`);
});

if (require.main === module) {
  app.listen.apply(app, args);
}

// append /api for our http requests
app.use("/api", router);
