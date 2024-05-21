import { NextFunction, Request, Response } from "express";
import { OrderControllers } from "../modules/orders/order.controller";
import { ProductControllers } from "../modules/products/product.controller";

const getQueryRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.searchTerm) {
    return ProductControllers.searchProducts(req, res);
  } else if (req.query.email) {
    return OrderControllers.getOrdersByUserEmail(req, res);
  } else {
    return next();
  }
};

export default getQueryRequest;
