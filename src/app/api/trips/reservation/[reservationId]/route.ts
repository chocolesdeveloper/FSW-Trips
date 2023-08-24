import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  _request: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) {
  if (!reservationId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "RESERVATION_NOT_FOUND",
        },
      }),
      { status: 404 }
    )
  }

  const reservation = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  })

  return new NextResponse(
    JSON.stringify({
      success: true,
      reservation,
    })
  )
}
