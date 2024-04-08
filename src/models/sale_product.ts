import { PAGE_DEFAULT, PAGE_LIMIT_DEFAULT } from "@/constants";
import prisma from "@/libs/prisma";

export interface iSaleProduct {
    id?: string
    product_name?: string
    price?: number
    amount?: number
    total?: number
    discount?: number
    total_balance?: number
    cost?: number
    sale_id?: string
    product_id?: string
    category_id?: string
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date | null
}

export interface iSaleProductGroupById {
    sale_id: string
    _sum?: { amount: number, total_balance: number }
    _min?: { created_at: Date }
}

export class SaleProduct {
    constructor() { }

    async paginate(page: number = PAGE_DEFAULT, limit: number = PAGE_LIMIT_DEFAULT, filters: any) {
        console.log("%c%s", "background: #04b8f4; color: #000000", "🚀 ~ file: sale_product.ts:30 ~ SaleProduct ~ paginate ~ filters:", filters)


        const groupBySaleIds = await prisma.saleProduct.groupBy({
            by: ['sale_id'],
            _sum: {
                amount: true,
                total_balance: true
            },
            _min: {
                created_at: true
            },
            orderBy: {
                _min: {
                    created_at: 'desc'
                }
            },
            where: {
                sale_id: {
                    contains: filters?.sale_id ?? undefined
                },
                created_at: {
                    gte: filters?.start_date ? new Date(new Date(filters?.start_date).setHours(0, 0, 0, 0)) : undefined,
                    lte: filters?.end_date ? new Date(new Date(filters?.end_date).setHours(23, 59, 59, 999)) : undefined
                }

            }
        })

        // const saleProducts = await prisma.saleProduct.findMany({
        //     skip: (page - 1) * limit,
        //     take: limit,
        //     orderBy: {
        //         created_at: 'desc'
        //     }
        // })

        return {
            results: groupBySaleIds
        }
    }

    async getMiniBoxes() {
        const now = new Date()
        const todayStart = now.setHours(0, 0, 0, 0)
        const todayEnd = now.setHours(23, 59, 59, 999)
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
        const yearStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)
        const yearEnd = new Date(now.getFullYear() + 1, 0, 0, 23, 59, 59, 999)

        const [today, monthly, yearly] = await Promise.all([
            this.getSummary(new Date(todayStart), new Date(todayEnd)),
            this.getSummary(new Date(monthStart), new Date(monthEnd)),
            this.getSummary(new Date(yearStart), new Date(yearEnd)),
        ])

        return { today, monthly, yearly }
    }

    async getSummary(dateStart: Date, dateEnd: Date) {
        return await prisma.saleProduct.aggregate({
            _sum: {
                amount: true,
                total_balance: true
            },
            where: {
                created_at: {
                    gte: dateStart,
                    lte: dateEnd
                }
            }
        })
    }
}