import { prisma } from "@/libs/prisma"
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const categories = await prisma.category.findMany()

  return Response.json(
    { results: categories },
    { status: 200, statusText: "OK" }
  );
  // return NextResponse.json(categories)
}