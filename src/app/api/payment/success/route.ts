import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")
  const text = await request.text()

  if (!sig) {
    return new NextResponse(
      JSON.stringify({
        message: "Not Found stripe-signature",
      }),
      { status: 404 }
    )
  }

  const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIP_WEBHOOK_SECRET_KEY!)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any

    await prisma.tripReservation.create({
      data: {
        startDate: new Date(session.metadata.startDate),
        endDate: new Date(session.metadata.endDate),
        userId: session.metadata.userId,
        tripId: session.metadata.tripId,
        totalPaid: Number(session.metadata.totalPrice),
        guests: Number(session.metadata.guests),
      },
    })
  }

  return new NextResponse(JSON.stringify({ recived: true }), { status: 200 })
}
