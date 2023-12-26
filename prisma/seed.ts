import { PrismaClient } from '@prisma/client'
import { categorySeeder } from "./seeder/categorySeeder"
import { userSeeder } from './seeder/userSeeder'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  const categoriesSeeded = await prisma.category.createMany({
    data: categorySeeder,
  })
  console.log('===== seeded categories =====>', categoriesSeeded.count)

  const usersSeeded = await prisma.user.createMany({
    data: userSeeder,
  })
  console.log('===== seeded users =====>', usersSeeded.count)

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })