import prisma from "@/libs/prisma"
import { Stock } from "./stock"

export interface SaleCreateInput {
  total_item: number
  total_price: number
  total_discount: number
  total_vat: number
  total_balance: number
  total_cost: number
}

export interface SaleProduct {
  product_name: string
  price: number
  amount: number
  total: number
  discount: number
  total_balance: number
  cost: number
  product_id: string
  category_id: string
}

export class Sale {

  async create(data: SaleCreateInput, products: SaleProduct[]) {
    const user = await prisma.user.findFirst()

    if (user) {
      const saleWithDetails = await prisma.sale.create({
        data: {
          ...data,
          user_id: user.id,
          sale_products: { createMany: { data: products } }
        },
        include: { sale_products: true }
      })

      try {
        new Stock().createMany(products.map(p => ({ product_id: p.product_id, amount: -p.amount })))
      } catch (error) {
        console.log("%c%s", "background: #f40404; color: #000000", "🚀 ~ file: sale.ts:43 ~ Sale ~ create ~ error:", error)
      }

      return saleWithDetails
    }
  }
}
