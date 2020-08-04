const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes"),
      fs = require("fs"),
      router = require("./router"),
      plainTextContentType = {
    "Content-type": "text/plain"
      },
      htmlContentType = {
        "Content-type": "text/html"
      };

const customReadFile = (file,res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...")
    }
    res.end(data);
  });
};

router.get("/",(req,res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("INDEX");
});

router.get("/index.html", (req,res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/index.html", res);
});

router.post("/", (req,res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("POSTED");
});

http.createServer(router.handle).listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);