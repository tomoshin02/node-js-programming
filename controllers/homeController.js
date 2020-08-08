exports.sendReqParam = (req,res) => {
  let veg = req.params.vegetable;
  res.send(`This page for ${veg}`);
}
exports.urlLogs = (req,res,next) => {
  console.log(`request made to ${req.url}`);
  console.log(req.query);
  next();
}
exports.PostLoggingSuccsessResponse = (req,res) => {
  console.log(req.body);
  res.send("POST Succsessful!")
}
exports.helloWorld = (req,res) => {
  res.send("Hello express!")
}