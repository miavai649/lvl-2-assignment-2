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

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
