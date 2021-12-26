const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { verifyToken, verifyAdmin, verifyBuyer } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

router.get("/", productController.getAllProducts);
router.post("/", verifyToken, upload.single("image"), productController.createProduct);
router.get("/:id", productController.getProductById);

module.exports = router;
