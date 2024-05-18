const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.post_create_get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/log-in');
  }
  res.render('post-form', { title: 'Create new post' });
});
exports.post_create_post = asyncHandler(async (req, res, next) => {});

exports.post_update_get = asyncHandler(async (req, res, next) => {});

exports.post_update_post = asyncHandler(async (req, res, next) => {});

exports.post_delete_get = asyncHandler(async (req, res, next) => {});

exports.post_delete_post = asyncHandler(async (req, res, next) => {});

exports.membership_post = asyncHandler(async (req, res, next) => {});

exports.post_list_get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/log-in');
  }

  const allPosts = await Post.find().exec();

  res.render('post-list', { title: 'All posts', posts: allPosts });

});
