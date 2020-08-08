exports.showIndex = (req,res) => {
  res.render("index");
};
exports.showCourses = (req,res) => {
  res.render("courses");
};
exports.showSignUp = (req,res) => {
  res.render("contact");
};
exports.postedSignUpForm = (req,res) => {
  res.render("thanks");
};

exports.urlLogs = (req,res,next) => {
  console.log(`request made to ${req.url}`);
  console.log(req.query);
  next();
};
exports.PostLoggingSuccsessResponse = (req,res) => {
  console.log(req.body);
  res.send("POST Succsessful!")
};