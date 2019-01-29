// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const RecipeSchema = new Schema(
  {
    id: Number,
    User: String,
    title: String,
    image: String,
    ingredients: String,
    instructions: String,
    soureceUrl: String,
    message: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Recipe", RecipeSchema);
