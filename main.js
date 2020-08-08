const express = require("express"),
      app = express(),
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController");

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