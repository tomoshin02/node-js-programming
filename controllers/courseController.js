const Course = require("../models/course");

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
    res.render(
      "courses/index"
    );
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
  }
};