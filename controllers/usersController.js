const User = require("../models/user"),
  {check, sanitizeBody, validationResult} = require('express-validator');

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
    res.render("users/index"); //res.localsを使うことでindexviewアクションを編集せずに描画内容を変更できる。
  },
  new: (req,res) => {
    res.render("users/new");
  },
  create: (req,res,next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    User.create(userParams)
      .then(user => {
        req.flash("success",`${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users",
        res.locals.user = user; //ユーザーの作成可否を判定をしている？
        next()
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/users/new";
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`
        );
        next();
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
  authenticate: (req,res,next) => {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
        if (user) {
          user.passwordComparison(req.body.password).then(passwordsMatch => {
              if (passwordsMatch) {
                res.locals.redirect = `/users/${user._id}`;
                req.flash("success", `${user.fullName}`);
                res.locals.user = user;
              } else {
                req.flash("error","error1");
                res.locals.redirect = "/users/login";
              }
              next();
            });
        } else {
          req.flash("error","error2");
          res.locals.redirect = "/users/login";
          next();
        }
      })
    .catch(error => {
      console.log(`Error logging in user: ${error.message}`)
      next(error);
    })
  },
  validate: (req,res,next) => {
    sanitizeBody("email")
    .nomalizeEmail({
      all_lowercase: true
    }).trim();
    check("email", "Email is invalid").isEmail();
    check("zipCode", "Zip code is invalid").notEmpty().isInt().isLength({min: 7,max: 7}).equals(req.body.zipCode);
    check("password", "Password cannot be empty").notEmpty();

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages = error.array().map(e => e.msg);
      req.skip = true;
      req.flash("error", messages.join(" and "));
      res.locals.redirect = "/users/new";
      next();
    } else {
      next();
    }
  }
};