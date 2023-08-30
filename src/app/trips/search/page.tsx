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
    <div className="container mx-auto flex flex-col items-center lg:items-start lg:mt-10">
      <h1 className="text-primaryDarker font-semibold text-xl lg:text-[2.5rem] lg:w-full">
        Hospedágens Encontradas
      </h1>
      <h2 className="text-grayPrimary font-medium mb-5 lg:mt-6 lg:w-full">
        {trips.length === 0 ? "Não achamos nada :(" : "Listamos as melhores viagens para você!"}
      </h2>

      <div className="flex flex-col items-center gap-3 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16">
        {trips && trips.map((trip) => <TripItem key={trip.id} trip={trip} />)}
      </div>
    </div>
  )
}
