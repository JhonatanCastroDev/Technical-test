'use client'
import { fetchProducts } from "@/hooks/useGetProducts"
import { Product } from "@/schemas/productSchema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function page() {
  const [products, setProducts] = useState<Product[]>([]);
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
      }
    };

    loadProducts();
  }, []);
  return (
    <>
    <div className="w-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-4/6 mx-auto">
      {products.map((pro) => (
    <Card className="w-[100%] overflow-hidden flex flex-col">
      <div className="flex-grow">
        <img 
          src={pro.image}
          alt={pro.title}
          className="w-full h-[200px] object-contain"
        />
        <CardHeader>
          <CardTitle className="text-2xl">{pro.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{pro.price}</p>
        </CardContent>
      </div>
      <CardFooter className="mt-auto">
        <Button className="w-full">Ver más</Button>
      </CardFooter>
    </Card>
      ))}
    </div>
    </>
  )
}

export default page