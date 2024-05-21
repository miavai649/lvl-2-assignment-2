import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// creating a single product and save this to our mongodb database
const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

// getting all our created products
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// getting a single specific product by product id
const getSpecificProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

// update a product information
const updateProductInfoIntoDB = async (productId: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: data },
    { new: true },
  );
  return result;
};

// delete a product from database
const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

// search products from database
const searchProductsFromDB = async (searchTerm: string) => {
  const result = await Product.find({
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
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
  updateProductInfoIntoDB,
  deleteProductFromDB,
  searchProductsFromDB,
};
