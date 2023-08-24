"use client"

import Button from "@/Components/Button"
import { Location } from "@/Components/Location"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"

import ptBR from "date-fns/locale/pt-BR"
import { toast } from "react-toastify"

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>
  onReload: () => Promise<void>
}

export function UserReservationItem({ reservation, onReload }: UserReservationItemProps) {
  const { trip } = reservation

  async function handleDeleteClick(reservationId: string) {
    const response = await fetch(`http://localhost:3000/api/trips/reservation/${reservationId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      return toast.error("Ops, algo deu errado ao cancelar!")
    }
    toast.success("Reserva cancelada com sucesso!")
    onReload()
  }
  return (
    <div>
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

        <h3 className="font-semibold mt-3 text-lg text-primaryDarker">
          Informações sobre a viagem
        </h3>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="font-medium">Data</h3>
          <div className="flex items-center gap-3 mt-1">
            <p className="capitalize text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>

            {" - "}

            <p className="capitalize text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <h3 className="font-medium mt-5">Hóspedes</h3>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm">{reservation.guests} hóspedes</p>
          </div>
        </div>

        <h3 className="font-semibold mt-3 text-primaryDarker">Informações sobre o preço</h3>

        <div className="flex justify-between mt-3 border-b border-grayLighter pb-5">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-medium">R$ {Number(reservation.totalPaid)}</p>
        </div>

        <Button
          className="mt-5 w-full"
          variant="danger"
          onClick={() => handleDeleteClick(reservation.id)}
        >
          Cancelar viagem
        </Button>
      </div>
    </div>
  )
}
