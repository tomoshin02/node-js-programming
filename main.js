const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes"),
      app = http.createServer();

app.on("request",(req,res) => {
  console.log("リクエストを受信しました。");

  var body = [];
  req.on("data",(bodyData) => {
    body.push(bodyData);
  });
  req.on("end",() => {
    body = Buffer
      .concat(body)
      .toString();
    console.log(`次の内容がPostされました: ${body}`);
  });
  
  res.writeHead(httpStatus.OK, {
    "Content-type": "text/html"
  });
  let messageBody = "The post successed!",
      HTMLmessage = `<h1>${messageBody}</h1>`;
  res.write(HTMLmessage);
  res.end();
  console.log(`レスポンスを送信しました。: ${HTMLmessage}`);
});

app.listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);