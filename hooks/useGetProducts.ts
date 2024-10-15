
import { productSchema, Product } from '../schemas/productSchema';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }

  const data = await response.json();

  // Validar cada producto usando Zod
  const products = data.map((item: any) => productSchema.parse(item));
  
  return products;
};