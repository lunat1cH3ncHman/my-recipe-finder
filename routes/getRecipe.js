const passport = require('passport');
var User = require("../models/user");
const Recipe = require("../models/recipe");

// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

module.exports = app => {
  app.get('/getRecipe', (req, res, next) => {
    console.log('Get Recipe');
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else if (info != undefined) {
        console.log(info.message);
        res.status(400).send(info.message);
      } else {
        console.log(req.query.recipeid);
        Recipe.findById(req.query.recipeid)
        .exec((err, recipe) => {
          if (err) {
            console.log('Could not find recipe');
            return res.status(400).send('Sorry something went wrong please try again');
          } else {
            console.log('Recipe found');
            return res.status(200).send({
              auth: true,
              title: recipe.title,
              image: recipe.image,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              sourceurl: recipe.sourceurl,
            });
          }
        });
      }
    })(req, res, next);
  });
};
