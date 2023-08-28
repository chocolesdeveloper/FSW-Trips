import { stripe } from "@/lib/stripe"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request: Request) {
  const userSession = await getServerSession(authOptions)

  const req = await request.json()

  const { tripId, totalPrice, name, description, coverImage, startDate, endDate, guests } = req

  const session = await stripe.checkout.sessions.create({
    success_url: process.env.HOST_URL!,
    metadata: {
      tripId,
      startDate,
      endDate,
      guests,
      totalPrice,
      userId: (userSession?.user as any)?.id,
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: totalPrice * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  })

  return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 })
}
