var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//LOCAL STRATEGY
require('../config/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/sign-up', function (req, res, next) {
  res.render('sign-up');
});
router.post('/sign-up', async function (req, res, next) {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return;
      } else {
        user.password = hashedPassword;
        await user.save();
      }
    });
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});
router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);
router.get('/log-out', function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
