const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index_get = function (req, res, next) {
  res.render('index', { user: req.user });
};

exports.user_create_get = function (req, res, next) {
  res.render('sign-up');
};

exports.user_create_post = [
  //validate incoming data
  body('username', 'username must contain atleast 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('password', 'password must be atleast 6 characters long')
    .trim()
    .isLength({ min: 6 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    //save user input for giving it back later to form if theres an error
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    //check if theres an error, then give back the user input
    if (!errors.isEmpty()) {
      res.render('sign-up', {
        title: 'Sign Up',
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      //else check if the username exists
      const userExist = await User.findOne({
        username: req.body.username,
      }).exec();
      //if it is, send the data back to the client for them to change it
      if (userExist) {
        res.render('sign-up', {
          title: 'Sign Up',
          user: user,
          errors: ['Username already exists, please use a different username'],
        });
        // else if all is good then hash the password and create one
      } else {
        bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
          if (err) {
            console.log(err);
            return;
          } else {
            user.password = hashedPassword;
            await user.save();
          }
        });
        res.redirect('/log-in');
      }
    }
  }),
];

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render('log-in', { title: 'Log in' });
});

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
