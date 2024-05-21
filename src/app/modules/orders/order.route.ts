import express from "express";
import { OrderControllers } from "./order.controller";
import getQueryRequest from "../../middlewares/getQueryRequest";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
router.get("/", getQueryRequest, OrderControllers.getAllOrders);
// router.get('/', OrderControllers.getOrdersByUserEmail)

export const OrderRouter = router;
