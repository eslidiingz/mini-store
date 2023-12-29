'use client'

import { iProduct } from "@/models/products"
import ProductCard from "../ProductCard"

const ProductCardList = ({ products }: { products: iProduct[] }) => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {products?.map((product: iProduct) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

export default ProductCardList
