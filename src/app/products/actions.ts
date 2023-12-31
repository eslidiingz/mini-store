'use server'
import { Product } from "@/models/products";
import { File } from "buffer";
import { writeFile } from 'fs/promises'
import { join } from 'path'

export const storeProduct = async (data: any) => {
  try {
    return new Product().create(data);
  } catch (error) {
    console.error("Error in storeProduct:", error);
    throw error; 
  }
}

const upload = async (data: any) => {
  const fileName = 'example.jpg';

  // Convert Blob to File
  const fileFromBlob = new File([data], fileName, { type: 'image/jpeg' });
  const file: any = fileFromBlob;

  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define the path using path.join
  const path = join('/', '/Users/eslidiingz/Works/Me/mini-store/public/uploads', file.name);

  try {
    // Write the buffer to the file
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);
    
    return { success: true };
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;  // Rethrow the error for the calling code to handle
  }
};


export const allProduct = async () => {
  try {
    return new Product().all()
  } catch (error) {
    console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: actions.ts:16 ~ allProduct ~ error:", error)
  }
}

export const allProductPaginate = async (page: number) => {
  console.log("%c%s", "background: #008cff; color: #000000", "🚀 ~ file: actions.ts:53 ~ allProductPaginate ~ page:", page)
  try {
    return new Product().paginate(page)
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