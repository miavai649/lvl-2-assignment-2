import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = (product: TProduct) => {
  const result = Product.create(product)
  return result
}

export const ProductServices = {
  createProductIntoDB
}
