import { Prisma } from "@prisma/client";

export const productSeeder = [
  {
    barcode: "000000000001",
    name: "มาม่าต้มยำกุ้ง",
    price: 7,
    photo: '/images/mama-tomyumkung.jpg',
    category_id: "6f9f6031-3fa8-4579-aeaa-407da3b9254c",
  },
  {
    barcode: "000000000002",
    name: "มาม่าหมูสับ",
    price: 7,
    photo: '/images/mama-moosub.jpg',
    category_id: "6f9f6031-3fa8-4579-aeaa-407da3b9254c",
  },
  {
    barcode: "000000000003",
    name: "โค้ก 10 บาท",
    price: 10,
    photo: '/images/coke.jpg',
    category_id: "32661814-6394-44f4-b1b6-2802dcfdfb22",
  },
  {
    barcode: "000000000004",
    name: "ทิชชู่ สก๊อต",
    price: 15,
    photo: '/images/tissue-scott.jpg',
    category_id: "1c08df68-2e0d-4a6b-9981-3dc0e2192a20",
  },
  {
    barcode: "000000000005",
    name: "น้ำแข็ง",
    price: 5,
    photo: '/images/ice.webp',
    category_id: "657112e3-4b44-42a3-9958-1f00197340a9",
  },
]