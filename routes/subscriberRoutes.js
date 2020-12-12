const router = require("express").Router(),
    subscribersController = require("../controllers/subscriberController");

router.get("/", subscribersController.index, subscribersController.indexview);
router.get("/register", subscribersController.subscribe);
router.post("/create", subscribersController.createSubscriber,subscribersController.redirectView);
router.get("/:id",subscribersController.show,subscribersController.showView);
router.delete("/:id/delete",subscribersController.delete,subscribersController.redirectView);
router.get("/:id/edit", subscribersController.edit);
router.put("/:id/update", subscribersController.update,subscribersController.redirectView);

module.exports = router;