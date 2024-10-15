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
import { Separator } from "@/components/ui/separator";
import formatToUSD from "@/helpers/currencyFormatter";

function Page() {
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
    <div className="mt-14 w-11/12 mx-auto">
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="mt-4 text-base text-gray-500">Checkout out the latest release of our shop, explore all the products we have for you!</p>
    </div>
    <Separator className="my-12 w-11/12 mx-auto" />
    <div className="flex">
      <div className="w-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-4/6 mx-auto">
        {products.map((pro) => (
      <Card className="w-[100%] overflow-hidden flex flex-col" key={pro.id}>
        <div className="flex-grow">
          <img 
            src={pro.image}
            alt={pro.title}
            className="w-full h-[200px] object-contain"
          />
          <CardHeader>
            <CardTitle className="text-2xl">{pro.title}</CardTitle>
          </CardHeader>
        </div>
          <CardContent>
            <p className="text-2xl font-semibold">{formatToUSD(pro.price)}</p>
          </CardContent>
        <CardFooter className="mt-auto">
          <Button className="w-full bg-[#5046e5] hover:bg-[#4438ca]">View more</Button>
        </CardFooter>
      </Card>
        ))}
      </div>
    </div>
    </>
  )
}

export default Page