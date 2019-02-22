const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    username: String,
    title: String,
    image: String,
    version: Number,
    ingredients: [{type: String}],
    instructions: [{type: String}],
    tags: [{type: String}],
    sourceurl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
