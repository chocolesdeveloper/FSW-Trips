"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Trip } from "@prisma/client"
import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import Image from "next/image"
import { Location } from "@/Components/Location"
import Button from "@/Components/Button"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

export default function Confirmation({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { status, data } = useSession()
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    async function getTrip() {
      const response = await fetch("/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      })

      const res = await response.json()

      if (res?.error) {
        return router.push("/")
      }

      const { trip, totalPrice } = res

      setTrip(trip)
      setTotalPrice(totalPrice)
    }

    if (status !== "authenticated") {
      router.push("/")
    }

    getTrip()
  }, [status, searchParams])

  async function handleBuyClick() {
    const response = await fetch("http://localhost:3000/api/trips/reservation", {
      method: "POST",
      body: JSON.stringify({
        tripId: params.tripId,
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
        guests: searchParams.get("maxGuests"),
        userId: (data?.user as any)?.id,
        totalPaid: totalPrice,
      }),
    })

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao realizar a reserva")
    }

    router.push("/")
    toast.success("Reserva criada!")
  }

  const startDate = new Date(searchParams.get("startDate") ?? "")
  const endDate = new Date(searchParams.get("endDate") ?? "")
  const guests = searchParams.get("maxGuests")

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker ">Sua Viagem</h1>
      {/* Card */}
      <div className="flex flex-col p-5 mt-5 border border-grayLighter rounded-lg shadow-lg ">
        <div className="flex items-center gap-3 border-b border-grayPrimary pb-5">
          <div className="relative h-[106px] w-[124px]">
            {trip?.coverImage && (
              <Image
                src={trip?.coverImage!}
                alt={trip?.name!}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            )}
          </div>

          <div className="flex flex-col gap-1 ">
            <h2 className="text-xl text-primaryDarker font-semibold">{trip?.name}</h2>

            <Location
              countryCode={trip?.countryCode!}
              location={trip?.location!}
              locationUnderline
            />
          </div>
        </div>

        <h3 className="font-semibold mt-3 text-lg text-primaryDarker">Informações sobre o preço</h3>

        <div className="flex justify-between mt-3">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-medium">R$ {totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold">Data</h3>
        <div className="flex items-center gap-3 mt-1">
          <p className="capitalize">
            {format(startDate, "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>

          {" - "}

          <p className="capitalize">
            {format(endDate, "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <div className="flex items-center gap-3 mt-1">
          <p>{guests} hóspedes</p>
        </div>
      </div>

      <Button className="mt-5 w-full" onClick={handleBuyClick}>
        Finalizar compra
      </Button>
    </div>
  )
}
