const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes");

const app = http.createServer((req,res) => {
  console.log("リクエストを受信しました。");
  res.writeHead(httpStatus.OK, {
    "Content-type": "text/html"
  });
  let messageBody = "Welcome node world!",
      HTMLmessage = `<h1>${messageBody}</h1>`;
  res.write(HTMLmessage);
  res.end();
  console.log(`レスポンスを送信しました。: ${HTMLmessage}`);
});

app.listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);