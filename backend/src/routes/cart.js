const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", verifyToken, cartController.getCart);
router.post("/", verifyToken, cartController.addToCart);

module.exports = router;
