import { iProduct } from '@/models/products';
import prisma from "@/libs/prisma"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export enum iCategoryType {
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export interface iCategory {
  id: string;
  name: string;
  slug: string;
  type: iCategoryType;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null

  products: iProduct[]
}

export interface CategoryUpdateInput {
  name: string
  slug?: string
  is_active?: boolean
}

export class Category {
  public id: string = "";
  public name: string = "";
  public is_active: boolean = true;
  public created_at: Date = new Date();
  public updated_at: Date = new Date();
  public deleted_at: Date | null = null;

  constructor(name?: string) {
    if (name) this.name = name
  }

  async save(_name?: string) {
    const name = _name ?? this.name
    
    const category = await prisma.category.create({
      data: {
        name: name,
        slug: name.toLowerCase().replace(/ /g, "-"),
      }
    })

    return category
  }

  static async paginate(page: number = 1, limit: number = 10) {
    const categories = await prisma.category.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        products: true
      }
    })
    
    return {
      results: categories
    }
  }

  static async all() {
    return await prisma.category.findMany({
      orderBy: {
        created_at: 'asc'
      }
    })
  }

  static async find(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    })

    return category
  }

  static async update(id: string, data: CategoryUpdateInput) {
    const dataUpdated = {
      name: data.name,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      is_active: data.is_active
    }
    
    return await prisma.category.update({
      where: {
        id
      },
      data: dataUpdated,
    })
  }

  static async delete(id: string) {
    return await prisma.category.delete({ where: { id } })
  }
}

export const getCategories = async () => {
  const categories = await prisma.category.findMany()

  return {
    results: categories
  }
}

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: {
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
    }
  })
}