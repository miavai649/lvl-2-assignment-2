import express from "express";
import { ProductControllers } from "./product.controller";
import getQueryRequest from "../../middlewares/getQueryRequest";
// import searchMiddleware from "../../middlewares/searchProductsMiddleware";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", getQueryRequest, ProductControllers.getAllProduct);
router.get("/:productId", ProductControllers.getSpecificProduct);
router.put("/:productId", ProductControllers.updateProductInfo);
router.delete("/:productId", ProductControllers.deleteProduct);
export const ProductRouter = router;
