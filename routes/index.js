var express = require('express');
var router = express.Router();

const {
  user_create_get,
  user_create_post,
  user_login_post,
  user_logout_get,
  user_login_get,
  index_get,
} = require('../controllers/userController');

//LOCAL STRATEGY

router.get('/', index_get);

router.get('/sign-up', user_create_get);
router.post('/sign-up', user_create_post);

router.get('/log-in', user_login_get);
router.post('/log-in', user_login_post);

router.get('/log-out', user_logout_get);

module.exports = router;
