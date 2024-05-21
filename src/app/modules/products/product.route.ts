import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProduct);
router.get("/:productId", ProductControllers.getSpecificProduct);
router.put("/:productId", ProductControllers.updateProductInfo);

export const ProductRouter = router;
