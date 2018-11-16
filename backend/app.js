const express = require('express');

// Express returns an app which is mostly middleware
const app = express();

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
    post: posts
  });
});

// export the express app to be used by the server
module.exports = app;
