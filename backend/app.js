const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://ravi:mM7bmYck2fpmpvG9@cluster0-c9iwp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb!");
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get("/api/posts", (req, res, next) => {
  console.log("Hello from express!");
  const posts = [
    {
      id: 'fad76786l',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'fad7676m',
      title: 'First server-side post',
      content: 'This is coming from the server!'
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
