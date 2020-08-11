const express = require("express"),
      app = express(),
      errorController = require("./controllers/errorController"),
      homeController = require("./controllers/homeController"),
      mongoose = require("mongoose"),
      Subscriber =require("./models/subscriber"),
      layouts = require("express-ejs-layouts"),
      subscribersController = require("./controllers/subscriberController"),
      usersController = require("./controllers/usersController");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB via Mongoose.");
});

app.set("view engine", "ejs");
app.use(layouts);
app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());

app.use(express.static("public"));

app.get("/", homeController.showIndex);
app.get("/courses", homeController.showCourses);
app.get("/subscribers", subscribersController.getAllSubscribers,
    (req,res,next) => {
      console.log(req.data);
      res.render("subscribers", {subscribers: req.data});
    });

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/users", usersController.index);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`The express server has started and is lisning on port :${app.get("port")}`);
});