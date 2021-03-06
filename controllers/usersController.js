const { json } = require("body-parser");
const User = require("../models/user");
const passport = require("passport"),
getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  };
};

module.exports = {
  index: (req,res, next) => {
    User.find()
    .then(users => {
      res.locals.users = users; // res.localsはレスポンスを送るまで有効、今回は下のindexviewに実際は値が渡っている。
      next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
  },
  indexView: (req,res) => {
    res.render("users/index");
  },
  new: (req,res) => {
    res.render("users/new");
  },
  create: (req,res,next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash("error", `Failed to create user account because: ${e.message}.`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  redirectView: (req,res,next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req,res,next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
      console.log(`Error fetching users by ID: ${error.message}`);
      next(error);
      });
  },
  showView: (req,res) => {
    res.render("users/show");
  },
  edit: (req,res,next) => {
    let userId =req.params.id;
    User.findById(userId)
    .then(user => {
      res.render("users/edit", {
        user: user
      });
   })
   .catch(error => {
     console.log(`Error fetching user by ID: ${error.message}`);
     next(error);
   });
  },
  update: (req,res,next) => {
    let userId = req.params.id,
        userParams = {
          name: {
            first: req.body.first,
            last: req.body.last
          },
          email: req.body.email,
          password: req.body.password,
          zipCode: req.body.zipCode
        };
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
    .then(user => {
      res.locals.redirect = `/users/${userId}`;
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
  },
  delete: (req,res,next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      });
  },
  login: (req,res) => {
    res.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),
  logout: (req,res,next) => {
    req.logout();
    req.flash("success", "You have been logged out");
    res.locals.redirect = "/";
    next();
  }
};