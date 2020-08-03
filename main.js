const port = 3000,
      http = require("http"),
      httpStatus = require("http-status-codes"),
      fs = require("fs");

const sendErrorResponse = res => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-type": "text/html"
  });
  res.write("<h1>Sorry, File is Not Found.</h1>");
  res.end();
};

http.createServer((req,res) => {
  let url = req.url;
  if (url.indexOf(".html") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-type": "text/html"
    });
    customeReadFile(`./views${url}`, res);
  } else if (url.indexOf(".js") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-type": "text/javascript"
    });
    customeReadFile(`./public/js${url}`, res);
  } else if (url.indexOf(".css") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-type": "text/css"
    });
    customeReadFile(`./public/css${url}`, res);
  } else if (url.indexOf(".png") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-type": "image/png"
    });
    customeReadFile(`./public/images${url}`, res);
  } else {
    sendErrorResponse(res);
  }
}).listen(port);
console.log("サーバーが起動しています。");
console.log(`ポート${3000}を監視中です。`);

const customeReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) {
        console.log(error);
        sendErrorResponse(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};