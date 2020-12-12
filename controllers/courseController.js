const httpStatus = require("http-status-codes")
const Course = require("../models/course");
const User = require("../models/user");

module.exports = {
  index: (req,res,next) => {
    Course.find()
    .then(courses => {
      res.locals.courses = courses;
      next();
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    })
  },
  indexView: (req,res) => {
    if (req.query.format === "json") {
      res.json(res.locals.courses);
    } else {
      res.render("courses/index");
    }
  },
  new: (req,res) => {
    res.render(
      "courses/new"
    );
  },
  create: (req,res,next) => {
    let postedCourse = {
      title: req.body.title,
      description: req.body.description,
      zipCode: req.body.zipCode,
      adress: req.body.adress,
      cost: req.body.cost
    };
    Course.create(postedCourse)
      .then(
        course => {
          res.locals.redirect = "/courses",
          res.locals.course = course;
          next();
      })
      .catch((error) => {
        console.log(error.message);
        next(error);
      });
  },
  redirectView: (req,res,next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req,res,next) => {
    let courseId = req.params.courseId;
    Course.findById(courseId)
    .then(course => {
      res.locals.course = course;
      console.log(res.locals.course);
      next();
    })
    .catch((error) => {
      next(error);
    });
  },
  showView: (req,res) => {
    res.render("courses/show");
  },
  edit: (req,res,next) => {
    let courseId = req.params.courseId;
    Course.findById(courseId)
    .then(course => {
      res.render("courses/edit",{
        course: course
      });
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    })
  },
  update: (req,res,next) => {
    let courseId = req.params.courseId,
        courseParams = {
          title: req.body.title,
          description: req.body.description,
          zipCode: req.body.zipCode,
          adress: req.body.adress,
          cost: req.body.cost
        };
    Course.findByIdAndUpdate(courseId, {
      $set: courseParams})
    .then(course => {
      res.locals.redirect = `/courses/${course._id}`;
      res.locals.course = course;
      next();
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    });
  },
  delete: (req,res,next) => {
    let courseId = req.params.courseId;
    Course.findByIdAndRemove(courseId)
    .then(() => {
      res.locals.redirect ="/courses";
      next();
    });
  },
  respondJSON: (req,res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  filterUserCourses: (req,res,next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedCourses = res.locals.courses.map(course => {
        let userJoined = currentUser.course.some(userCourse => {
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), { joined: userJoined});
      });
      res.locals.courses = mappedCourses;
      next();    
    } else {
      next();
    }
  },
  join: (req,res,next) => {
    let courseId = req.params.id,
    currentUser = req.user;
    if(currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          courses: courseId
        }
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must login."));
    }
  }
};