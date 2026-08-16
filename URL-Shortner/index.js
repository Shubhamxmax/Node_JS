const express = require("express");
const path = require("path");
const {connectMongoDb} = require('./connection')
const URL = require("./models/url")

const app = express();
const PORT = 8001;


const urlRoute = require('./routes/url');
const staticRoute = require("./routes/Staticrouter")
const userRoute = require('./routes/user');


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>
  console.log("Mongodb connected Yoooo!")

);


// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false})); // for form data




app.use("/url", urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);







app.get("/:shortId", async (req, res) => {
    const shortID = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortID: shortID
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );

    res.redirect(entry.redirectURL);
});


app.listen(PORT, ()=>{console.log(`Server Started at PORT ${PORT}`)});