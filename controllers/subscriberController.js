const Subscriber = require("../models/subscriber");
const user = require("../models/user");

module.exports = {
  // getAllSubscribers: (req,res) => {
  //   Subscriber.find({})
  //   .exec()
  //   .then((subscribers) => {
  //     res.render("subscribers", {
  //       subscribers: subscribers
  //       //findクエリの結果をsubscribers(青)に格納してsubscribersオブジェクト（紫）の値にしてる
  //     });
  //     console.log(subscribers);
  //   })
  // },
  index: (req,res,next) => {
    Subscriber.find()
    .then(subscribers => {
      res.locals.subscribers = subscribers;
      next();
    }).catch((error) => {
      console.log(error.message);
      next(error);
    });
  },
  indexview: (req,res) => {
    res.render("subscribers/index");
  },
  subscribe: (req,res) => {
    res.render("subscribers/subscribe");
  },
  createSubscriber: (req,res,next) => {
    Subscriber.create({
      name:req.body.name,
      email: req.body.email,
      zipcode: req.body.zipcode
    })
    .then(
      subscriber => {
        res.locals.redirect = "/subscribers",
        res.locals.subscriber = subscriber;
        next()
      })
      .catch(error => {
        console.log(error.message);
        next(error);
      });
  },
  redirectView: (req,res,next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  delete: (req,res,next) => {
    let subscriberId = req.params.subscriberId;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        console.log(subscriberId);
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(error.message);
        next();
      });
  },
  show: (req,res,next) => {
    let subscriberId = req.params.subscriberId;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(error.message);
        next(error);
      });
  },
  showView: (req,res,next) => {
    res.render("subscribers/show")
  },
  edit: (req,res,next) => {
    let subscriberId = req.params.subscriberId;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(error => {
        console.log(error.message);
        next(error);
      });
  },
  update: (req,res,next) => {
    let subscriberId = req.params.id,
    subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    };
    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
    .then(subscriber => {
      res.locals.redirect = `/subscribers/${subscriberId}`;
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(error.message);
      next(error);
    });
  }
}