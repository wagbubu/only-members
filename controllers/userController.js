const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.index_get = function (req, res, next) {
  res.render('index', { user: req.user });
};

exports.user_create_get = function (req, res, next) {
  res.render('sign-up');
};
exports.user_create_post = async function (req, res, next) {
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
};

exports.user_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.user_logout_get = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
