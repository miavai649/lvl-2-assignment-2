"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("../modules/orders/order.controller");
const product_controller_1 = require("../modules/products/product.controller");
const getQueryRequest = (req, res, next) => {
    if (req.query.searchTerm) {
        return product_controller_1.ProductControllers.searchProducts(req, res);
    }
    else if (req.query.email) {
        return order_controller_1.OrderControllers.getOrdersByUserEmail(req, res);
    }
    else {
        return next();
    }
};
exports.default = getQueryRequest;
