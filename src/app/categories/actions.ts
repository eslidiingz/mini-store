'use server'

import { Category } from "@/models/category"

export const getCategories = async () => {
  try {
    return await Category.all()
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:6 ~ getCategories ~ error:", error)
  }
}

export const storeCategory = async (name: string) => {
  try {
    return new Category(name).save()
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:13 ~ createCategory ~ error:", error)
  }
}

export const updateCategory = async (id: string, data: object) => {
  try {
    return await Category.update(id, data)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:20 ~ createCategory ~ error:", error)
  }
}

export const destroyCategory = async (id: string) => {
  try {
    return await Category.delete(id)
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:29 ~ createCategory ~ error:", error)
  }
}