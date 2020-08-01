const routeResponseMap = {
  "/info": "<h1>Info page</h1>",
  "/contact": "<h1>Contact Us</h1>"
};
const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes"),
      app = http.createServer((req,res) => {
  console.log("リクエストを受信しました。");

  res.writeHead(httpStatus.OK, {
    "Content-type": "text/html"
  });

  let messageBody = "The post successed!",
      HTMLmessage = `<h1>${messageBody}</h1>`;
  if (routeResponseMap[req.url]) {
    res.end(routeResponseMap[req.url]);
  } else {
    res.end(HTMLmessage);
  }
  console.log(`レスポンスを送信しました。: ${HTMLmessage}`);
});

app.listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);