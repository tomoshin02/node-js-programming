"use strict";

const express = require("express"),
layouts = require("express-ejs-layouts"),
app = express(),
router = require("./routes/index"),
mongoose = require("mongoose");

const passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
User = require("./models/user"),
connectFlash = require("connect-flash");

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb+srv://akazawa3101:akazawa3101@mongidb.pizxq.mongodb.net/mongidb?retryWrites=true&w=majority" || "mongodb://mongo-db:27017/recipe_db" ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection; 
db.once(
  "open", () => {console.log("Connected to MongoDB via Mongoose.");}
  );

const methodOverride = require("method-override");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);
app.use(cookieParser("secretCuisine123"));
app.use(expressSession({
  secret: "secretCuisine123",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.urlencoded({
  extended:false
}));
app.use(express.json());
app.use(express.static("public"));
app.use("/", router);

app.set("port", process.env.PORT || 3000);
const server =app.listen(app.get("port"), () => {
  console.log(`The express server has started and is lisning on port :${app.get("port")}`);
}),
io = require("socket.io")(server),
chatController = require("./controllers/chatController")(io);