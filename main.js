const express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB via Mongoose.");
});

const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});
const Subscriber =mongoose.model("Subscriber", subscriberSchema);

var subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@jonwexler.com"
});

subscriber1.save((error, savedDocument) => {
  if (error) console.log(error);
  console.log(savedDocument);
});

Subscriber.create(
  {
    name: "Satoshi Akazawa",
    email: "satoshi@aworks.jp"
  },
  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);

const layouts = require("express-ejs-layouts");
app.use(layouts);
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());

app.use(express.static("public"));

app.get("/", homeController.showIndex);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact",homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`The express server has started and is lisning on port :${app.get("port")}`);
});