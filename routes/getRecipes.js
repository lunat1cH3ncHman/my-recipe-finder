const Recipe = require("../models/recipe");
const passport = require('passport');

module.exports = app => {
  app.get("/getRecipes", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if(err) {
        console.log(`finduser ${err}`);
      }
      if (info != undefined){
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log('Get reciepes user authenticated');
        Recipe.find((err, recipe) => {
          if (err){
            return res.json({ success: false, error: err });
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
