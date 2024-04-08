'use server'

import { PAGE_LIMIT_DEFAULT } from "@/constants"
import { SaleProduct } from "@/models/sale_product"

export const getSaleProducts = async (page: number, filters: any) => {
    return new SaleProduct().paginate(page, PAGE_LIMIT_DEFAULT, filters)
}

export const getSaleProductMiniBoxes = async () => {
    return new SaleProduct().getMiniBoxes()
}