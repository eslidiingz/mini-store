'use server'
import { Product } from "@/models/products"
import { Stock, StockCreateInput, iAddStockForm } from "@/models/stock"


export const storeStock = async (data: iAddStockForm) => {
  let product_id = data?.product_id

  if (data?.product_id == undefined) {
    const product = await new Product().create({ name: data.product_name })
    product_id = product.id
  }

  const dataStore: StockCreateInput = {
    product_id: product_id as string,
    amount: data.amount
  }
  
  try {
    return new Stock().create(dataStore)
  } catch (error) {
    
  }
}