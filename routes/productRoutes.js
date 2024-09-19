const express = require("express");
const productContoller = require("../controllers/productContoller");
const router = express.Router();
router.post("/add-product/:firmId", productContoller.addProduct);
router.get("/:firmId/products", productContoller.getProductByFirm);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});
router.delete("/:productId", productContoller.deleteProductById);
module.exports = router;
