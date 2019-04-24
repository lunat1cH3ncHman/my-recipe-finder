const Recipe = require("../models/recipe");
const passport = require('passport');

module.exports = app => {
  app.post("/editRecipe", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if(err) {
        res.status(400).send(err);
      }
      if (info != undefined){
        res.status(400).send(info.message);
      } else {
        Recipe.findById(req.body.recipeid).then( recipe => {
          if (recipe == null) {
            console.log('Recipe not found');
            res.status(400).send('Something went wrong or recipe not found');
          } else {
            const {
              recipeTitle,
              image,
              ingredients,
              instructions,
              sourceurl } = req.body;

            recipe.title = recipeTitle;
            recipe.image = image;
            recipe.ingredients = ingredients;
            recipe.instructions = instructions;
            recipe.sourceurl = sourceurl;

            recipe.save(err => {
              if (err) {
                return res.status(400).send('Sorry something went wrong please try again');
              } else {
                console.log('Recipe updated');
                return res.status(200).send('Recipe updated');
              }
            });
          }
        })
      }
    })(req, res, next);
  });
}
