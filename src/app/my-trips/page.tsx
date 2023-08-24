"use client"

import { Prisma, TripReservation } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserReservationItem } from "./componentes/UserReservationItem"

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true }
    }>[]
  >([])

  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/")
    }

    async function fetchReservations() {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
      )
      const res = await response.json()

      setReservations(res)
    }

    fetchReservations()
  }, [status])

  return (
    <div className="container mx-auto p-5">
      <h1 className=" text-xl text-primaryDarker font-semibold">Minhas viagens</h1>

      {reservations &&
        reservations.map((reservation) => (
          <UserReservationItem key={reservation.id} reservation={reservation} />
        ))}
    </div>
  )
}
