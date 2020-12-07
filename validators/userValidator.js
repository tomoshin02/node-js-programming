const {check, validationResult } = require('express-validator');

module.exports = {
validate:[
  check("email", "Email is invalid")
    .normalizeEmail({all_lowercase: true})
    .trim()
    .isEmail(),
  check("zipCode", "Zip code is invalid")
    .notEmpty()
    .isInt()
    .isLength({
      min: 5,
      max: 7
    }),
  check("password", "Password cannot be empty")
    .notEmpty(),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages = errors.array().map(e => e.msg);
      req.skip = true;
      req.flash("error", messages.join(" and "));
      res.locals.redirect = '/users/new';
    }
    next();
  }]
}