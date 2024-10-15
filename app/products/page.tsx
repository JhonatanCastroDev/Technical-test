'use client'
import { fetchProducts, fetchProductsByCategory, fetchProductsCategories } from "@/hooks/useGetProducts"
import { Categories, Product } from "@/schemas/productSchema";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import formatToUSD from "@/helpers/currencyFormatter";
import DetailsModal from "@/components/DetailsModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowUpDown, AArrowDown, AArrowUp } from "lucide-react";

function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories>([]);

  // first general load
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setOriginalProducts(products);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error;
        }
      }
    };

    loadProducts();

    const loadCategories = async () => {
      try {
        const categories = await fetchProductsCategories()
        setCategories(categories)
      } catch (err) {
        if (err instanceof Error) {
          throw new Error;
        }
      }
    }

    loadCategories()
  }, []);

  //filter all the products by category
  const loadProductsByCategory = async (category : string) => {
    try {
      const products = await fetchProductsByCategory(category)
      setProducts(products)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  const sortLowHigh = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price)
    setProducts(sortedProducts)
  }

  const sortHighLow = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price)
    setProducts(sortedProducts)
  }

  const sortAtoZ = () => {
    const sortedProducts = [...products].sort((a,b) => a.title.localeCompare(b.title))
    setProducts(sortedProducts)
  }

  const sortZtoA = () => {
    const sortedProducts = [...products].sort((a,b) => b.title.localeCompare(a.title))
    setProducts(sortedProducts)
  }
  const filterAllProducts = () => {
    setProducts(originalProducts)
  }

  return (
    <>
    <div className="mt-14 w-11/12 mx-auto">
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="mt-4 text-base text-gray-500">Check out the latest release of our shop, explore all the products we have for you!</p>
    </div>
    <Separator className="my-12 w-11/12 mx-auto" />
    <div className="flex flex-col lg:flex-row justify-between w-11/12 mx-auto">
      <div className="flex justify-center gap-4 mb-8 lg:justify-start lg:flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 p-3 lg:pr-8 text-left border border-gray-200">
            Sort by:
            <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => sortLowHigh()}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <span>Price: low - high</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortHighLow()}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <span>Price: high - low</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortAtoZ()}>
              <AArrowDown className="mr-2 h-4 w-4"/>
              <span>A - Z</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortZtoA()}>
              <AArrowUp className="mr-2 h-4 w-4"/>
              <span>Z - A</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator className=" hidden lg:block"/>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 p-3 border border-gray-200">
            Categories:
            <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={filterAllProducts}>
              <span>All</span>
            </DropdownMenuItem>
            {categories.map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => loadProductsByCategory(cat)}>
              <span className="first-letter:uppercase">{cat}</span>
            </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-5/6 mx-auto lg:mx-0">
        {products.map((pro) => (
      <Card className="w-[100%] overflow-hidden flex flex-col" key={pro.id}>
        <div className="flex-grow">
          <img 
            src={pro.image}
            alt={pro.title}
            className="w-full h-[200px] object-contain mt-4"
          />
          <CardHeader>
            <CardTitle className="text-2xl">{pro.title}</CardTitle>
          </CardHeader>
        </div>
          <CardContent>
            <p className="text-2xl font-semibold">{formatToUSD(pro.price)}</p>
          </CardContent>
        <CardFooter className="mt-auto">
          <DetailsModal
            product={pro}
          />
        </CardFooter>
      </Card>
        ))}
      </div>
    </div>
    </>
  )
}

export default Page;
