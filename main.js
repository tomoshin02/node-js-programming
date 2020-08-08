const port = 3000,
      express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController");

app.use(express.urlencoded({
  extended:false
}));
app.use(express.json());

app.use(homeController.urlLogs);
app.get("/", homeController.helloWorld);
app.post("/",homeController.PostLoggingSuccsessResponse);
app.get("/items/:vegetable", homeController.sendReqParam);
app.listen(port, () => {
  console.log(`The express server has started and is lisning on port :${port}`);
});