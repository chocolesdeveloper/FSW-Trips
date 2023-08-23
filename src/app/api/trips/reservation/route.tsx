import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const req = await request.json()

  const { startDate, endDate, userId, tripId, totalPaid, guests } = req

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  })

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      }),
      { status: 404 }
    )
  }

  await prisma.tripReservation.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      tripId,
      totalPaid,
      guests: Number(guests),
    },
  })

  return new NextResponse(
    JSON.stringify({
      sucess: true,
    }),
    {
      status: 201,
    }
  )
}
