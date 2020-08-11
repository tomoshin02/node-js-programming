const mongoose = require("mongoose"),
      User = require("./models/user"),
      Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db", {useNewUrlParser: true});

var testUser;
var targetSubscriber;

User.create({
  name: {
    first: "Jon",
    last: "Wexler"
  },
  email: "jon@mal.com",
  password: "pass123"
})
  .then(user => {testUser = user;
    return Subscriber.findOne({
      email: user.email
    });
  })
  .then(subscriber => {
    testUser.subscribedAccount = subscriber;
    testUser.save()
    .then(user => {
      console.log("user updated");
      console.log(user);
    })
  })
  .catch(error => console.log(error.message));
