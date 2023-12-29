
'use server'

import { Sale, SaleCreateInput } from "@/models/sale"

type SaleProduct = {
  id?: string,
  barcode?: string,
  name?: string,
  price?: number,
  cost_price?: number,
  category_id?: string,
  amount?: number
}

export const storeSaleTransaction = async (saleList: SaleProduct[]) => {
  const saleTransaction: SaleCreateInput = {
    total_item: 0,
    total_price: 0,
    total_discount: 0,
    total_vat: 0,
    total_balance: 0,
    total_cost: 0,
  }

  const saleProducts = saleList.map((item: any) => {
    const price = parseFloat(item.price)
    const amount = parseInt(item.amount)
    const discount = parseFloat(item.discount ?? 0)
    const vat = parseFloat(item.vat ?? 0)
    const cost = parseFloat(item.cost_price ?? 0)
    
    saleTransaction.total_item += amount
    saleTransaction.total_price += price * amount
    saleTransaction.total_discount += discount
    saleTransaction.total_vat += vat
    saleTransaction.total_balance += (price * amount)
    saleTransaction.total_cost += (cost * amount)

    return {
      product_name: item.name,
      price: price,
      amount: amount,
      total: price * amount,
      discount: discount,
      total_balance: (price * amount) - discount,
      cost: (cost * amount),
      product_id: item.id,
      category_id: item.category_id
    }
  })

  try {
    return new Sale().create(saleTransaction, saleProducts)
  } catch (error) {

  }
}