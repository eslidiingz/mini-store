'use server'
import { Product } from "@/models/products"

export const storeProduct = async (data: any) => {
  try {
    return new Product().create(data)
  } catch (error) {
    
  }
}

export const allProduct = async () => {
  try {
    return new Product().all()
  } catch (error) {
    
  }
}

export const allProductPaginate = async () => {
  try {
    return new Product().paginate()
  } catch (error) {
    
  }
}

export const findProduct = async (id: string) => {
  try {
    return new Product().find(id)
  } catch (error) {
    
  }
}

export const findProductByBarcode = async (barcode: string) => {
  try {
    return new Product().findByBarcode(barcode)
  } catch (error) {
    
  }
}

export const getProductTopSaleList = async () => {
  try {
    return new Product().topSale()
  } catch (error) {
    
  }
}