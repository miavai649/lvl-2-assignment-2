import mongoose from "mongoose";
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// create order into database
const createOrderIntoDB = async (orderData: TOrder) => {
  // checking if the given product id is valid or not
  if (!mongoose.Types.ObjectId.isValid(orderData.productId)) {
    throw new Error("Id format is not valid.");
  }

  // if valid then finding the product
  const product = await Product.findById(orderData.productId);
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
  } else if (countQuantity === 0) {
    await Product.findByIdAndUpdate(product._id, {
      $set: {
        "inventory.quantity": countQuantity,
        "inventory.inStock": false,
      },
    });
  } else {
    await Product.findByIdAndUpdate(product._id, {
      $set: {
        "inventory.quantity": countQuantity,
      },
    });
  }

  // creating order
  const result = await Order.create(orderData);
  return result;
};

// get all orders from database
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

// retrieve orders data by user email from database
const getOrderByEmailFromDB = async (userEmail: string) => {
  const result = await Order.aggregate([{ $match: { email: userEmail } }]);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
