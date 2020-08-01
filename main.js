const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes"),
      fs = require("fs");

const routeMap = {
  "/": "views/index.html"
};

const app = http.createServer((req,res) => {
  res.writeHead(httpStatus.OK, {
    "Content-type": "text/html"
  });

  
  if (routeMap[req.url]) {
    fs.readFile(routeMap[req.url], (error,data) => {
      res.write(data);
      res.end();
    });
  } else {
    let messageBody = "Sorry, This page is not found.",
    HTMLmessage = `<h1>${messageBody}</h1>`;
    res.end(HTMLmessage);
  };
});

app.listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);