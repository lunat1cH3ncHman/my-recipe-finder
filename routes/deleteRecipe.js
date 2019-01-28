const Recipe = require("../models/recipe");

module.exports = app => {
  app.delete("/deleteRecipe", (req, res) => {
    const { id } = req.body;
    Recipe.findByIdAndDelete(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
}
