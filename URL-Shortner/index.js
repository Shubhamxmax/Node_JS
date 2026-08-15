const express = require("express");
const {connectMongoDb} = require('./connection')
const urlRoute = require('./routes/url');

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>
  console.log("Mongodb connected Yoooo!")

);


app.use("/url", urlRoute);
app.listen(PORT, ()=>{console.log(`Server Started at PORT ${PORT}`)});