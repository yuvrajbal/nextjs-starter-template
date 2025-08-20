// src/app/api/test/route.ts
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    return Response.json({ success: true, userCount })
  } catch (error) {
    console.error("Prisma error:", error)
    return Response.json({ error: "Database connection failed" }, { status: 500 })
  }
}