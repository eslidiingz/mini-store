import prisma from "@/libs/prisma"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

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

  async save(id?: string) {
    const category = await prisma.category.create({
      data: {
        name: this.name
      }
    })

    return category
  }

  static async all() {
    const categories = await prisma.category.findMany({
      orderBy: {
        created_at: 'asc'
      }
    })
    
    return {
      results: categories
    }

    // return categories.map(category => new Category(
    //   category.id,
    //   // category.name,
    //   // category.is_active,
    //   // category.created_at,
    //   // category.updated_at,
    //   // category.deleted_at
    // ))
  }

  static async find(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    })

    return category
  }

  static async update(id: string, data: object) {
    return await prisma.category.update({
      where: {
        id
      },
      data
    })
  }

  static async delete(id: string) {
    return await prisma.category.delete({
      where: {
        id
      }
    })
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
      name
    }
  })
}