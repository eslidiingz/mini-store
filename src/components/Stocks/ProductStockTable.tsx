'use client'

import { iProduct } from "@/models/products"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Pagination from "../Pagination"

type ProductStockTableProps = {
  productStocks: any
}

const ProductStockTable = (props: ProductStockTableProps) => {
  const router = useRouter()
  const searchParams: any = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1
  const product_id = parseInt(searchParams.get('product_id')) || ""

  const paginate = {
    currentPage: props?.productStocks?.currentPage,
    pages: props?.productStocks?.pages,
    currentItems: props?.productStocks?.currentItems,
    totalItems: props?.productStocks?.totalItems,
  }

  const handleProductStockClick = (product: iProduct) => {
    router.push(`?page=${page}&product_id=${product.id}`)
  }

  const nextPage = () => {
    if (page >= props.productStocks.pages) return
    router.push(`?page=${page + 1}&product_id=${product_id}`)
  }

  const previousPage = () => {
    if (page <= 1) return
    router.push(`?page=${page - 1}&product_id=${product_id}`)
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

      <Pagination 
        paginate={props?.productStocks}
        onNext={nextPage} 
        onPrevious={previousPage} />
    </>
  )
}

export default ProductStockTable