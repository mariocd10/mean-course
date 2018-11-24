const express = require('express');
const bodyParser = require('body-parser');
const Post  = require('./models/post');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// Express returns an app which is mostly middleware
const app = express();

mongoose.connect("mongodb+srv://"+config.database.user+":"+config.database.password+"@cluster0-2krgw.mongodb.net/"+config.database.db+"?retryWrites=true")
  .then(() => {
    console.log('Connected to the db');
  })
  .catch(() => {
    console.log('Connection failed');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({ // 201 resource code usually means successfully added new resource while 200 is just successful
    message: 'Post added successfully'
  });
})

// First arg is the path to filter
app.get('/api/posts', (req, res, next) => {
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
