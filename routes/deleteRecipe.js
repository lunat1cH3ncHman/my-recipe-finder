const Data = require("../models/data");

module.exports = app => {
  app.delete("/deleteRecipe", (req, res) => {
    const { id } = req.body;
    Data.findByIdAndDelete(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
}
