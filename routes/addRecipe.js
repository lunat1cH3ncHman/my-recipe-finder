const Recipe = require("../models/recipe");

module.exports = app => {
  app.post("/addRecipe", (req, res) => {
    let recipe = new Recipe();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    recipe.message = message;
    recipe.id = id;
    recipe.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
}
