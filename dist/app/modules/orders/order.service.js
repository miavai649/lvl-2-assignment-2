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
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
// create order into database
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given product id is valid or not
    if (!mongoose_1.default.Types.ObjectId.isValid(orderData.productId)) {
        throw new Error("Id format is not valid.");
    }
    // if valid then finding the product
    const product = yield product_model_1.Product.findById(orderData.productId);
    console.log("🚀 ~ createOrderIntoDB ~ product:", product);
    // if product not found that means then throwing a error message
    if (!product) {
        throw new Error("Product not found or invalid product ID.");
    }
    // if product stock is false then sending a error message
    if (!product.inventory.inStock) {
        throw new Error(`The product "${product.name}" is currently out of stock.`);
    }
    // counting the product quantity
    const countQuantity = product.inventory.quantity - orderData.quantity;
    if (countQuantity < 0) {
        // if quant
        throw new Error("Insufficient product quantity");
    }
    else if (countQuantity === 0) {
        yield product_model_1.Product.findByIdAndUpdate(product._id, {
            $set: {
                "inventory.quantity": countQuantity,
                "inventory.inStock": false,
            },
        });
    }
    else {
        yield product_model_1.Product.findByIdAndUpdate(product._id, {
            $set: {
                "inventory.quantity": countQuantity,
            },
        });
    }
    // creating order
    const result = yield order_model_1.Order.create(orderData);
    return result;
});
// get all orders from database
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
// retrieve orders data by user email from database
const getOrderByEmailFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([{ $match: { email: userEmail } }]);
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrderByEmailFromDB,
};
