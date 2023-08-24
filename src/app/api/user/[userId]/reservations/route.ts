import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "USER_NOT_FOUND",
        },
      }),
      {
        status: 404,
      }
    )
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  })

  return new NextResponse(JSON.stringify(reservations), { status: 200 })
}
