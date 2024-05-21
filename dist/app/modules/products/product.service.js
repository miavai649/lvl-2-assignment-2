"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (product) => {
    const result = product_model_1.Product.create(product);
    return result;
};
exports.ProductServices = {
    createProductIntoDB
};
