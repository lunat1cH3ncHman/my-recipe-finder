const Data = require("../models/data");

module.exports = app => {
  app.get("/getRecipes", (req, res) => {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
}
