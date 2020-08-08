const express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController");
      
const layouts = require("express-ejs-layouts");
app.use(layouts);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({
  extended:false
}));
app.use(express.json());

app.use(homeController.urlLogs);
app.get("/", homeController.helloWorld);
app.post("/",homeController.PostLoggingSuccsessResponse);
app.get("/items/:vegetable", homeController.sendReqParam);
app.get("/name/:myName", homeController.respondWithName);
app.listen(app.get("port"), () => {
  console.log(`The express server has started and is lisning on port :${app.get("port")}`);
});