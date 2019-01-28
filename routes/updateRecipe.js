const Recipe = require("../models/recipe");

module.exports = app => {
  app.post("/updateRecipe", (req, res) => {
    const { id, update } = req.body;
    Recipe.findByIdAndUpdate(id, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
}
