'use client'
import { Product } from "@/schemas/productSchema"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import formatToUSD from "@/helpers/currencyFormatter"

const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative">
            <Star className="w-5 h-5 text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${Math.max(0, Math.min(100, (rating - star + 1) * 100))}%` }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        ))}
      </div>
    )
  }

const DetailsModal = ({product} : {product : Product}) => {
    const [isOpen, setIsOpen] = useState(false)
    const productRating = product.rating.rate
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button className="w-full bg-[#5046e5] hover:bg-[#4438ca]">View more</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] h-fit block">
          <DialogHeader>
            <div className="w-full mb-4 h-fit">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-[400px] object-contain rounded-lg"
              />
            </div>
            <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{formatToUSD(product.price)}</span>
              <div className="flex items-center">
                <StarRating rating={productRating} />
                <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
              </div>
            </div>
            <DialogDescription>
              {product.description}
            </DialogDescription>
            <div>
                <h3 className="text-sm text-gray-500">Category: {product.category}</h3>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} className="w-full bg-[#5046e5] hover:bg-[#4438ca]">Add to cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

export default DetailsModal