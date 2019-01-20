const express = require('express');
const router = express.Router();

// get user lisiting
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// get a user profile
router.get('/profile', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
