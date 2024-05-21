import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// for create a single product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const result = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product. Please try again later.",
      error: error,
    });
  }
};

// for get all product at once
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

// for get a specific product
const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSpecificProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found. Please check the product ID and try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not found. Please try again later.",
      error: error,
    });
  }
};

// for update product information
const updateProductInfo = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const result = await ProductServices.updateProductInfoIntoDB(
      productId,
      productData,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found. Please check the product ID and try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "An error occurred while updating the product. Please try again later.",
      error: error,
    });
  }
};

// for delete a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found. Please check the product ID and try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "An error occurred while deleting the product. Please try again later.",
      error: error,
    });
  }
};

// for search products
const searchProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.searchProductsFromDB(
      searchTerm as string,
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found matching the search term '${searchTerm}'.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching products. Please try again later.",
      error: error,
    });
  }
  // next();
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSpecificProduct,
  updateProductInfo,
  deleteProduct,
  searchProducts,
};
