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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
// for create a single product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const result = yield product_service_1.ProductServices.createProductIntoDB(productData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product. Please try again later.",
            error: error,
        });
    }
});
// for get all product at once
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
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
// for get a specific product
const getSpecificProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSpecificProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found. Please check the product ID and try again.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product not found. Please try again later.",
            error: error,
        });
    }
});
// for update product information
const updateProductInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateProductInfoIntoDB(productId, productData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found. Please check the product ID and try again.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product. Please try again later.",
            error: error,
        });
    }
});
// for delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found. Please check the product ID and try again.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product. Please try again later.",
            error: error,
        });
    }
});
// for search products
const searchProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductServices.searchProductsFromDB(searchTerm);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No products found matching the search term '${searchTerm}'.`,
            });
        }
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products. Please try again later.",
            error: error,
        });
    }
    next();
});
exports.ProductControllers = {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    updateProductInfo,
    deleteProduct,
    searchProducts,
};
