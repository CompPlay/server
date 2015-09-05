var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var isAuthenticated = require('./isAuthenticated');

router.delete('/', isAuthenticated, function(req, res) {
  User.findOne({ _id: req.session.passport.user }, function(err, user) {
    if (err)
      return handleError(err);
    else {
      User.remove();
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "User deleted" });
    }
  });
});

module.exports = router;
