const Recipe = require("../models/recipe");
const passport = require('passport');

module.exports = app => {
  app.post("/addRecipe", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if(err) {
        res.status(400).send(err);
      }
      if (info != undefined){
        res.status(400).send(info.message);
      } else {
        let recipe = new Recipe();

        const {
          username,
          recipeTitle,
          image,
          ingredients,
          instructions,
          sourceurl } = req.body;

        recipe.username = username;
        recipe.title = recipeTitle;
        recipe.image = image;
        recipe.version = 1;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.sourceurl = sourceurl;
        recipe.save(err => {
          if (err) {
            return res.status(400).send('Sorry something went wrong please try again');
          } else {
            console.log('User created');
            return res.status(200).send('Recipe added');
          }
        });
      }
    })(req, res, next);
  });
}
