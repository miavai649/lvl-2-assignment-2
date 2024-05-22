"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// variant schema validation
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Type is required" }),
    value: zod_1.z.string().min(1, { message: "Value is required" }),
});
// inventory schema validation
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .min(0, { message: "Quantity must be a non-negative number" }),
    inStock: zod_1.z.boolean(),
});
// product schema validation
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().min(0, { message: "Price must be a non-negative number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: "Tags must be non-empty strings" }))
        .min(1, { message: "At least one tag is required" }),
    variants: zod_1.z
        .array(variantValidationSchema)
        .min(1, { message: "At least one variant is required" }),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
