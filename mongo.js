const mongoose = require('mongoose');

// Set the proper environment use_env_variable
const env = process.env.NODE_ENV || 'development';

// Get the environment settings from config
const config = require('./config/mongo')[env];

// A Schema
// Is an object that defines the structure of any documents that will be stored in your
// MongoDB collection; it enables you to define types and validators for all of your data items.
//
// A Connection
// Is a fairly standard wrapper around a database connection.
//
// A Model
// Is an object that gives you easy access to a named collection,
// allowing you to query the collection and use the Schema to validate any documents you save to that collection.
// It is created by combining a Schema, a Connection, and a collection name.
//
// A Document
// Is an instantiation of a Model that is tied to a specific document in your collection.

module.exports = () => {

  // Set the prod MongoDB URL if we're using the prod config
  const envUrl = process.env[config.use_env_variable];

  // Define a local URL variable if we're not in prod
  //const localUrl = 'mongodb://${config.host}/${config.database}';
  const localUrl = process.env.MONGO_ROUTE

  // Set the connection url
  const mongoUrl = envUrl ? envUrl : localUrl

  return mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true });
};
