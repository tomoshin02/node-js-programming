const express = require("express"),
      app = express(),
      errorController = require("./controllers/errorController"),
      homeController = require("./controllers/homeController"),
      mongoose = require("mongoose"),
      Subscriber =require("./models/subscriber"),
      layouts = require("express-ejs-layouts"),
      subscribersController = require("./controllers/subscriberController"),
      usersController = require("./controllers/usersController"),
      router = express.Router();

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

app.use("/", router);
router.get("/", homeController.showIndex);
router.get("/courses", homeController.showCourses);
router.get("/subscribers", subscribersController.getAllSubscribers,
    (req,res,next) => {
      console.log(req.data);
      res.render("subscribers", {subscribers: req.data});
    });

router.get("/contact", subscribersController.getSubscriptionPage);
router.post("/subscribe", subscribersController.saveSubscriber);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create,usersController.redirectView);
router.get("/users/:id", usersController.show,usersController.showView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`The express server has started and is lisning on port :${app.get("port")}`);
});