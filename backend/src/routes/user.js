const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/all", userController.getUser);
router.get("/", verifyToken, userController.getUserData);
router.post("/", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
