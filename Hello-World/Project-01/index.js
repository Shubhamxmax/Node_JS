const express = require("express");
const app = express();
const PORT = 5000;

const {connectMongoDb} = require('./connection')
const {logReqRes} = require("./middlewares");
const userRouter = require("./routes/user")


//Connection to MongoDB

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>
  console.log("Mongodb connected Yoooo!")

);


//Middleware - Plugin

app.use(express.urlencoded({ extended: false})); 
app.use(logReqRes('log.txt'));


// Connecting to Router

app.use("/api/user",userRouter); //       '/api/user' will use userRouter


// Starting the server

app.listen(PORT, () => {
  console.log("Server Started");
});
