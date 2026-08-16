const express = require('express')
const {handleGenerateNewShortURL,handleShowAnalytics} = require('../controllers/url')
const router = express.Router();    


router.post('/',handleGenerateNewShortURL)

router.get('/analytics/:shortID',handleShowAnalytics)

module.exports = router;