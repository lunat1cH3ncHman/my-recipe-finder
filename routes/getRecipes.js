const Recipe = require("../models/recipe");
const passport = require('passport');

module.exports = app => {
  app.get("/getRecipes", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if(err) {
        console.log(`finduser ${err}`);
        res.status(400).send(err);
      }
      if (info != undefined){
        console.log(info.message);
        res.status(400).send(info.message);
      } else {
        console.log('User authenticated Get recipes');

        Recipe.find({username: user.username})
        .sort({timestamps: 1})
        .exec((err, recipe) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send({
              recipes: recipe
            });
          }
        });
      }
    })(req, res, next);
  });
};
