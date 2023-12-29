import { Prisma } from "@prisma/client";

export const categorySeeder: Prisma.CategoryCreateInput[] = [
  {
    id: "657112e3-4b44-42a3-9958-1f00197340a9",
    name: "Uncategory",
    slug: "uncategory",
    type: "SYSTEM"
  },
  {
    id: "6f9f6031-3fa8-4579-aeaa-407da3b9254c",
    name: "Food",
    slug: "food",
    type: "USER"
  },
  {
    id: "32661814-6394-44f4-b1b6-2802dcfdfb22",
    name: "Drink",
    slug: "drink",
    type: "USER"
  },
  {
    id: "1c08df68-2e0d-4a6b-9981-3dc0e2192a20",
    name: "Miscellaneous",
    slug: "miscellaneous",
    type: "USER"
  }
]