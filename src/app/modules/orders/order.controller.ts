import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

// for create new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // data validating by zod
    const zodParsedOrderData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedOrderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create order. Please try again later.",
      error: error,
    });
  }
};

// for get all orders at once
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products. Please try again later.",
      error: error,
    });
  }
};

// for retrieve orders data by user email
const getOrdersByUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await OrderServices.getOrderByEmailFromDB(email as string);

    if (result?.length === 0) {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching orders. Please try again later.",
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByUserEmail,
};
