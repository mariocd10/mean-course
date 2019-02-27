const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require('path');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

mongoose
  .connect(
    "mongodb+srv://" + config.database.user + ":" + config.database.password + "@cluster0-2krgw.mongodb.net/" + config.database.db + "?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
