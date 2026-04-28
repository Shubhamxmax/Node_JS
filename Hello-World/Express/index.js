const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {
  return res.send("Hello From About Page "+ req.query.name + " Age : " + req.query.age);
});

app.listen(7000, () => console.log("Server Started"))

