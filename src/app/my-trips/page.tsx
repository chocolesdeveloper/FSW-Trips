"use client"

import { TripReservation } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>([])

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

  return <div>hello</div>
}
