'use server'
import { Product } from "@/models/products"

export const storeProduct = async (data: any) => {
  try {
    return new Product().create(data)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:8 ~ storeProduct ~ error:", error)
  }
}

export const allProduct = async () => {
  try {
    return new Product().all()
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:16 ~ allProduct ~ error:", error)
  }
}

export const allProductPaginate = async () => {
  try {
    return new Product().paginate()
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:24 ~ allProductPaginate ~ error:", error)
  }
}

export const findProduct = async (id: string) => {
  try {
    return new Product().find(id)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:32 ~ findProduct ~ error:", error)
  }
}

export const findProductByBarcode = async (barcode: string) => {
  try {
    return new Product().findByBarcode(barcode)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:40 ~ findProductByBarcode ~ error:", error)
  }
}

export const getProductTopSaleList = async () => {
  try {
    return new Product().topSale()
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:48 ~ getProductTopSaleList ~ error:", error)
  }
}

export const updateProduct = async (id: string, data: any) => {
  try {
    return new Product().update(id, data)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:56 ~ destroyProduct ~ error:", error)
  }
}

export const destroyProduct = async (id: string) => {
  try {
    return new Product().delete(id)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:64 ~ destroyProduct ~ error:", error)
  }
}