"use client"

import { TripItem } from "@/Components/TripItem"
import { Trip } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchTrips() {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get(
          "startDate"
        )}&budget=${searchParams.get("budget")}`
      )

      const res = await response.json()

      setTrips(res)
    }

    fetchTrips()
  }, [])

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-primaryDarker font-semibold text-xl">Hospedágens Encontradas</h1>
      <h2 className="text-grayPrimary font-medium mb-5">
        {trips.length === 0 ? "Não achamos nada :(" : "Listamos as melhores viagens para você!"}
      </h2>

      <div className="flex flex-col items-center gap-3">
        {trips && trips.map((trip) => <TripItem key={trip.id} trip={trip} />)}
      </div>
    </div>
  )
}
