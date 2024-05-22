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
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
// creating a single product and save this to our mongodb database
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
// getting all our created products
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
// getting a single specific product by product id
const getSpecificProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given product id is valid or not
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new Error("Id format is not valid.");
    }
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
// update a product information
const updateProductInfoIntoDB = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given product id is valid or not
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new Error("Id format is not valid.");
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, { $set: data }, { new: true });
    return result;
});
// delete a product from database
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given product id is valid or not
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new Error("Id format is not valid.");
    }
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
// search products from database
const searchProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({
        $or: [
            {
                name: { $regex: searchTerm, $options: "i" },
            },
            {
                category: { $regex: searchTerm, $options: "i" },
            },
            {
                description: { $regex: searchTerm, $options: "i" },
            },
        ],
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSpecificProductFromDB,
    updateProductInfoIntoDB,
    deleteProductFromDB,
    searchProductsFromDB,
};
