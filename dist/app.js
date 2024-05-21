"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/products/product.route");
const order_route_1 = require("./app/modules/orders/order.route");
const app = (0, express_1.default)();
// all parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// APPLICATION ROUTES
// ---------- Product Routes -----------
app.use("/api/products", product_route_1.ProductRouter);
app.use("/api/orders", order_route_1.OrderRouter);
app.get("/", (req, res) => {
    const a = "hello world";
    res.send(a);
});
exports.default = app;
