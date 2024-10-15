'use client'
import { fetchProducts } from "@/hooks/useGetProducts"
import { Product } from "@/schemas/productSchema";
import { useEffect, useState } from "react";

function page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  return (
    <div>
      {products.map((pro) => (
        <h3>{pro.title}</h3>
      ))}
    </div>
  )
}

export default page