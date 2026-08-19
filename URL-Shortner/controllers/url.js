const {nanoid} = require("nanoid")
const URL = require("../models/url")

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortID = nanoid(8);

    await URL.create({
        shortID : shortID,
        redirectURL: body.url, //.url is from home.ejs
        visitedHistory: [],
        createdBy: req.user._id, //req.user is from middleware
    });
   return res.render('home',{
    id: shortID
   })
  
}

async function handleShowAnalytics(req, res) {
    const shortId = req.params.shortID;

    const result = await URL.findOne({ shortID : shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics : result.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortURL,
     handleShowAnalytics
}