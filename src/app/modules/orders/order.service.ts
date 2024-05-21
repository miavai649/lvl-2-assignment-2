import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// create order into database
const createOrderIntoDB = async (orderData: TOrder) => {
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
