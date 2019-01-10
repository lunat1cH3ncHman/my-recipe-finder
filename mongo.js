const mongoose = require('mongoose');

// Set the proper environment use_env_variable
const env = process.env.NODE_ENV || 'development';

// Get the environment settings from config
const config = require('./config/mongo')[env];
console.log(config);


module.exports = () => {

  // Set the prod MongoDB URL if we're using the prod config
  const envUrl = process.env[config.use_env_variable];

  // Define a local URL variable if we're not in prod
  //const localUrl = 'mongodb://${config.host}/${config.database}';
  const localUrl = process.env.MONGO_ROUTE

  // Set the connection url
  const mongoUrl = envUrl ? envUrl : localUrl

  console.log(mongoUrl);

  return mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true });
};
