const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes"),
      fs = require("fs");

const getViewUrl = (url) => {
  return `views${url}.html`;
};

let messageBody = "Sorry, This page is not found.",
    HTMLmessage = `<h1>${messageBody}</h1>`;

const app = http.createServer((req,res) => {
  let viewUrl = getViewUrl(req.url);
  fs.readFile(viewUrl, (error,data) => {
    if (error) {
      res.writeHead(httpStatus.NOT_FOUND);
      res.write(HTMLmessage);
    } else {
      res.writeHead(httpStatus.OK, {
        "Content-type": "text/html"
      });
      res.write(data);
    };
    res.end();
  });
});

app.listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);