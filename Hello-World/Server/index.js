const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {
  // console.log("New Req Recorded");
  // console.log(req);// give all the information of client or user

  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;

  // fs.appendFile('log.txt',log,(err,data)=>{
  //     res.end("Hello From  shubham's Server")
  // })

  const myUrl = url.parse(req.url, true); //It converts the URL(req.url) into an object with different key–value pairs

  // console.log(myUrl)

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are your results from " + search);
      case "/signup":
        if (req.method === "GET") res.end("This is a signupform");
        else if (req.method === "POST") res.end("Success");
        break;

      default:
        res.end("404 Not Found");
    }
  });
});

myServer.listen(8800, () => console.log("Server Started"));
