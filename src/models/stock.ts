import prisma from "@/libs/prisma";

export interface iAddStockForm {
  barcode: string
  product_id?: string
  product_name: string
  amount: number
}

export type iAddStockFormError = Omit<iAddStockForm, "amount"> & { amount: string };

export interface StockCreateInput {
  product_id: string
  amount: number
}

export interface iStock {
  id: string
  product_id: string
  amount: number
  user_id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export class Stock {
  public id?: string = ""
  public product_id?: string = ""
  public amount?: number = 1
  public user_id?: string = ""
  public created_at?: Date = new Date()
  public updated_at?: Date = new Date()
  public deleted_at?: Date | null = null

  constructor() { }

  async create(data: StockCreateInput) {
    const user = await prisma.user.findFirst()

    if (user != null) {
      try {
        await prisma.stock.create({
          data: { ...data, user_id: user?.id }
        })
      } catch (error) {
        console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: stock.ts:44 ~ Stock ~ create ~ error:", error)
      }
    }
  }

  async createMany(data: StockCreateInput[]) {
    const user = await prisma.user.findFirst()

    if ( user != null ) {
      try {
        await prisma.stock.createMany({
          data: data.map((stock) => ({ ...stock, user_id: user?.id }))
        })
      } catch (error) {
        console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: stock.ts:44 ~ Stock ~ create ~ error:", error)
      }
    }
  }
}