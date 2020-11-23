"use strict";

const express = require("express"),
app = express(),
router = express.Router(),
layouts = require("express-ejs-layouts"),
mongoose = require("mongoose"),
errorController = require("./controllers/errorController"),
homeController = require("./controllers/homeController"),
subscribersController = require("./controllers/subscriberController"),
usersController = require("./controllers/usersController"),
Subscriber =require("./models/subscriber");

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB via Mongoose.");
});
const methodOverride = require("method-override");
const subscriber = require("./models/subscriber");
const courseController = require("./controllers/courseController");
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

const expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash");
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
router.use(connectFlash());
router.use((req,res,next) => {
  res.locals.flashMessages = req.flash();
  next();
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

router.get("/subscribers", subscribersController.index, subscribersController.indexview);
router.get("/subscribers/register", subscribersController.subscribe);
router.post("/subscribers/create", subscribersController.createSubscriber,
subscribersController.redirectView);
router.get("/subscribers/:subscriberId",subscribersController.show,subscribersController.showView);
router.delete("/:subscriberId/delete",subscribersController.delete,subscribersController.redirectView);
router.get("/subscribers/:subscriberId/edit", subscribersController.edit);
router.put("/subscribers/:subscriberId/update", subscribersController.update,
subscribersController.redirectView);

router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create,usersController.redirectView);
router.get("/users/:id", usersController.show,usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update,usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView)

router.get("/courses", courseController.index,courseController.indexView);
router.get("/courses/new", courseController.new);
router.post("/courses/create", courseController.create,courseController.redirectView);
router.get("/courses/:courseId",courseController.show,courseController.showView);
router.get("/courses/:courseId/edit", courseController.edit);
router.put("/courses/:courseId/update",courseController.update,courseController.redirectView)
router.delete("/courses/:courseId/delete",courseController.delete,courseController.redirectView)

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`The express server has started and is lisning on port :${app.get("port")}`);
});