const mongoose = require("mongoose"),
      Course = require("./models/course");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://akazawa3101:akazawa3101@mongidb.pizxq.mongodb.net/mongidb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

Course.remove({})
  .then(() => {
    return Course.create({
      title: "Beets sitting at home",
      description: "Seasonal beets from the guy down the street.",
      zipCode: 1232333,
      items: ["beets"]
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Beets sitting at home",
      description: "Seasonal beets from the guy down the street.",
      zipCode: 1232333,
      items: ["beets"]
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Beets sitting at home",
      description: "Seasonal beets from the guy down the street.",
      zipCode: 1232333,
      items: ["beets"]
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Beets sitting at home",
      description: "Seasonal beets from the guy down the street.",
      zipCode: 1232333,
      items: ["beets"]
    });
  })
  .then(course => console.log(course.title))
  .catch(error => console.log(error.message))
  .then(() => {
    console.log("DONE");
    mongoose.connection.close();
  });