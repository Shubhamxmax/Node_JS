const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  // console.log("New Req Recorded");
  // console.log(req);// give all the information of client or user
  if( req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  // fs.appendFile('log.txt',log,(err,data)=>{
  //     res.end("Hello From  shubham's Server")
  // })
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("I am Shubham");
        break;
      default:
        res.end("404 Not Found");
    }
  });
});

myServer.listen(8000, () => console.log("Server Started"));
