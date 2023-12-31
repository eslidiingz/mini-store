import AddStock from '@/components/Stocks/AddStock';
import ProductStockTable from '@/components/Stocks/ProductStockTable';
import React from 'react'
import { allProductPaginate } from '../products/actions';
import StockHistory from '@/components/Stocks/StockHistory';
import Pagination from '@/components/Pagination';

const ProductIndexPage = async ({ searchParams }: { searchParams : { [key: string]: string | string[] | undefined }}) => {
  const page = (searchParams?.page != undefined) ? parseInt(searchParams?.page.toLocaleString()) : 1
  const productStocks = await allProductPaginate(page)

  let productStockHistories;

  if ( searchParams?.product_id != undefined ) {
    productStockHistories = productStocks?.results.find((product: any) => product.id == searchParams?.product_id)?.stocks
  }
  
  return (
    <div className='py-10'>
      <div className="flex justify-between my-4 px-4 sm:px-6 lg:px-8">
        <h2 className='text-3xl font-bold'>Stocks</h2>
        <AddStock />
      </div>
      <hr />

      <div className='flex h-screen divide-x border'>
        <div className="w-1/2">
          <ProductStockTable productStocks={productStocks} />
        </div>

        <div className="w-1/2">
          <StockHistory histories={productStockHistories} />
          {/* <StockForm /> */}
        </div>
      </div>
    </div>

  )
}

export default ProductIndexPage
