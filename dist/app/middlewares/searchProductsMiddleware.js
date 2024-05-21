"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../modules/products/product.controller");
const searchMiddleware = (req, res, next) => {
    if (req.query.searchTerm) {
        return product_controller_1.ProductControllers.searchProducts(req, res, next);
    }
    else {
        return next();
    }
};
exports.default = searchMiddleware;
