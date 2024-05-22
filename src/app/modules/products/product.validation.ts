import { z } from "zod";

// variant schema validation
const variantValidationSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

// inventory schema validation
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: "Quantity must be a non-negative number" }),
  inStock: z.boolean(),
});

// product schema validation
const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().min(0, { message: "Price must be a non-negative number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z
    .array(z.string().min(1, { message: "Tags must be non-empty strings" }))
    .min(1, { message: "At least one tag is required" }),
  variants: z
    .array(variantValidationSchema)
    .min(1, { message: "At least one variant is required" }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
