"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const getQueryRequest_1 = __importDefault(require("../../middlewares/getQueryRequest"));
const router = express_1.default.Router();
router.post("/", order_controller_1.OrderControllers.createOrder);
router.get("/", getQueryRequest_1.default, order_controller_1.OrderControllers.getAllOrders);
// router.get('/', OrderControllers.getOrdersByUserEmail)
exports.OrderRouter = router;
