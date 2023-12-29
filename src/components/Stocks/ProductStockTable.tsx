'use client'

import { iProduct } from "@/models/products"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

type ProductStockTableProps = {
  productStocks: any
}

const ProductStockTable = (props: ProductStockTableProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleProductStockClick = (product: iProduct) => {
    router.push(`?product_id=${product?.id}`)
  }

  return (
    <>
      {props?.productStocks?.results?.map((product: iProduct) => (
        <div key={product?.id}
          className={`border-b border-gray-200 cursor-pointer ${searchParams?.get('product_id') == product?.id ? 'bg-[var(--primary-color-light)]' : 'hover:bg-gray-50'}`}
          onClick={() => handleProductStockClick(product)}
        >
          <div className="p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <Image width={50} height={50} src={product?.photo ?? `https://via.placeholder.com/50`} alt={product?.name ?? ""} className="border rounded-lg" />
              </div>
              <div>
                <div>{product?.name}</div>
                <small className="text-gray-400 text-xs">{product?.barcode}</small>
              </div>
              <div className="ml-auto">{product?.total_stock}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductStockTable