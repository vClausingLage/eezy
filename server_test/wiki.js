import express from 'express'
const wiki = express.Router();

// Home page route.
wiki.get("/", function (req, res) {
  res.send("Wiki home page");
});

// About page route.
wiki.get("/about", function (req, res) {
  res.send("About this wiki");
});

export default wiki