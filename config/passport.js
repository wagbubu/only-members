const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const verifyUser = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyUser);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
