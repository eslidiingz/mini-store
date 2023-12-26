import { Prisma } from "@prisma/client";

export const userSeeder: Prisma.UserCreateInput[] = [
  {
    name: "Super Admin",
  }
]