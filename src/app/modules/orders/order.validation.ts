import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  price: z.number().min(0, { message: "Price must be a non-negative number" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export default orderValidationSchema;
