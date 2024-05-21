"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const getQueryRequest_1 = __importDefault(require("../../middlewares/getQueryRequest"));
// import searchMiddleware from "../../middlewares/searchProductsMiddleware";
const router = express_1.default.Router();
router.post("/", product_controller_1.ProductControllers.createProduct);
router.get("/", getQueryRequest_1.default, product_controller_1.ProductControllers.getAllProduct);
router.get("/:productId", product_controller_1.ProductControllers.getSpecificProduct);
router.put("/:productId", product_controller_1.ProductControllers.updateProductInfo);
router.delete("/:productId", product_controller_1.ProductControllers.deleteProduct);
exports.ProductRouter = router;
