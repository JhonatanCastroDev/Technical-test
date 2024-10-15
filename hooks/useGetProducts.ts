
import { productSchema, Product, categoriesSchema } from '../schemas/productSchema';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  
  if (!response.ok) {
    throw new Error('Error getting the products');
  }

  const data = await response.json();

  // Validar cada producto usando Zod
  const products = data.map((item: any) => productSchema.parse(item));
  
  return products;
};

export const fetchProductsCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  
  if (!response.ok) {
    throw new Error('Error getting the categories');
  }

  const data = await response.json();

  // Validar cada producto usando Zod
  const categories = categoriesSchema.parse(data)
  
  return categories;
}

export const fetchProductsByCategory = async (cat : string) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${cat}`);
  
  if (!response.ok) {
    throw new Error('Error getting the products by category');
  }

  const data = await response.json();

  // Validar cada producto usando Zod
  const products = data.map((item: any) => productSchema.parse(item));
  
  return products;
}
