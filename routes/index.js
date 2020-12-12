const router = require("express").Router(),
    courseRoutes = require("./courseRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes"),
    subscriberRoutes = require("./subscriberRoutes"),
    userRoutes = require("./userRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;