import prisma from "@/libs/prisma"

export interface SaleCreateInput{
  total_item: number
  total_price: number
  total_discount: number
  total_vat: number
  total_balance: number
  total_cost: number
}

export class Sale {

  async create(data: SaleCreateInput, products: any) {
    const user = await prisma.user.findFirst()

    if ( user ) {
      const saleWithDetails = await prisma.sale.create({
        data: { 
          ...data, 
          user_id: user.id,
          sale_products: { createMany: { data: products } }
        },
        include: { sale_products: true }
      })
      
      return saleWithDetails
    }
  }
}

// export class SaleProduct {
  
//   async create(data: any) {
//     const saleProduct = await prisma.saleProduct.create({
//       data
//     })
//     return saleProduct
//   }
// }