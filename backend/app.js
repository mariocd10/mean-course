const express = require('express');

// Express returns an app which is mostly middleware
const app = express();

// We want to execute this middlware before every request
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin' , '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
  next();
});

// First arg is the path to filter
app.use('/api/posts', (req, res, next) => {
  const posts = [{
    id: 'awef434g3wq',
    title: 'first post from server',
    content: 'content from the server'
  }, {
    id: 'awasdfef434g3wq',
    title: 'second post from server',
    content: 'content'
  }];

  res.status(200).json({
    message: 'Request successful!',
    posts: posts
  });
});

// export the express app to be used by the server
module.exports = app;
