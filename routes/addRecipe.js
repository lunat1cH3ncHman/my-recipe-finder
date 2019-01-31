const Recipe = require("../models/recipe");
const passport = require('passport');

module.exports = app => {
  app.post("/addRecipe", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if(err) {
        console.log(`finduser ${err}`);
      }
      if (info != undefined){
        console.log(info.message);
        res.send(info.message);
      } else {
        let recipe = new Recipe();

        const {
          username,
          recipeTitle,
          image,
          ingredients,
          instructions,
          sourceurl } = req.body;

        if (!recipeTitle) {
          return res.json({
            success: false,
            message: 'Title not populated',
          }).status(400).send();
        }

        recipe.username = username;
        recipe.title = recipeTitle;
        recipe.image = image;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.sourceurl = sourceurl;
        recipe.save(err => {
          if (err) {
            return res.status(400).send({message: 'Error saving recipe'});
          } else {
            return res.status(200).send({message: 'Recipe added'});
          }
        });
      }
    })(req, res, next);
  });
}
