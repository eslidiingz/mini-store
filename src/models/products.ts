import prisma from "@/libs/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
const bwipjs = require('bwip-js');
// import bwipjs from "bwip-js";

// export interface ProductCreateInput extends Prisma.ProductCreateInput {
//   category_id: string;
// }

export interface ProductCreateInput {
  name: string
  barcode?: string
  category_id?: string
}

export interface iProduct {
  id?: string
  barcode?: string
  name?: string
  price?: number
  cost_price?: number
  description?: string
  photo?: string
  category_id?: string
  is_active?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date | null
  total_stock? : number
}


export class Product {
  constructor() { }

  async create(data: any) {
    if (data.barcode == undefined) {
      data = { ...data, barcode: this.randomBarcode() }
    }
    if (data.category_id == undefined) {
      const category = await prisma.category.findFirst({ where: { slug: "uncategory" } });
      if (category != null) {
        data = { ...data, category_id: category.id }
      }
    }

    return await prisma.product.create({ data })
  }

  async all() {
    const products = await prisma.product.findMany()
    return products
  }

  async paginate(page: number = 1, limit: number = 10) {
    const productsWithStockSum = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        stocks: true
      },
    });
    
    // Calculate the total stock amount for each product
    const productsWithTotalStock = productsWithStockSum.map(product => {
      const totalStockAmount = product.stocks.reduce((sum, stock) => sum + stock.amount, 0);
      return {
        ...product,
        total_stock: totalStockAmount,
      };
    });
    
    return {
      results: productsWithTotalStock
    }
  }

  async find(id: string) {
    return await prisma.product.findUnique({ where: { id } })
  }



  async findByBarcode(barcode: string) {
    return await prisma.product.findFirst({ where: { barcode } })
  }

  async topSale(limit: number = 10) {
    return await prisma.product.findMany({
      take: limit
    })
  }

  randomBarcode() {
    const min = Math.pow(10, 11); // Minimum value with 12 digits
    const max = Math.pow(10, 12) - 1; // Maximum value with 12 digits

    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  generateBarcode(data: any, format: any, options?: any) {
    return new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: format,
        text: data,
        ...(options || {}),
      }, (err: any, png: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(png.toString('base64'));
        }
      });
    });
  }
}