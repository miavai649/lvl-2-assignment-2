"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
// for create new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // data validating by zod
        const zodParsedOrderData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedOrderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create order. Please try again later.",
            error: error,
        });
    }
});
// for get all orders at once
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products. Please try again later.",
            error: error,
        });
    }
});
// for retrieve orders data by user email
const getOrdersByUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrderServices.getOrderByEmailFromDB(email);
        if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found. Please check the user email and try again.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching orders. Please try again later.",
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
    getOrdersByUserEmail,
};
