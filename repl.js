const Course = require("./models/course");
const Subscriber = require("./models/subscriber");
var testCourse, testSubscriber;

Course.create({
  title: "Tomato Land",
  descriptin: "Locally farmed tomatoes only",
  zipCode: 1000001,
  items: ["cherry"]
}).then(course => testCourse = course);

Subscriber.findOne({}).then(
  subscriber =>  testSubscriber = subscriber
);

