"use client"

import { Prisma, TripReservation } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserReservationItem } from "./componentes/UserReservationItem"
import Button from "@/Components/Button"
import Link from "next/link"

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true }
    }>[]
  >([])

  const { status, data } = useSession()
  const router = useRouter()

  async function fetchReservations() {
    const response = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`)
    const res = await response.json()

    setReservations(res)
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/")
    }

    fetchReservations()
  }, [status])

  return (
    <div className="container mx-auto p-5">
      <h1 className=" text-xl text-primaryDarker font-semibold lg:text-4xl">Minhas viagens</h1>

      {reservations && reservations.length > 0 ? (
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-4 lg:mb-5">
          {reservations.map((reservation) => (
            <UserReservationItem
              onReload={fetchReservations}
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center mt-5 lg:max-w-[500px] lg:mx-auto">
          <p className="text-sm text-primaryDarker font-medium">
            Infelizmente você não tem nem uma viagem :(
          </p>

          <Link href="/">
            <Button className="px-5">Fazer Reserva</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
