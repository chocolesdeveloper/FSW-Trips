"use client"

import Button from "@/Components/Button"
import DatePicker from "@/Components/DatePicker"
import Input from "@/Components/Input"
import { Trip } from "@prisma/client"

interface TripReservationProps {
  tripDetails: Trip
}

export function TripReservation({ tripDetails }: TripReservationProps) {
  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center gap-3 ">
        <DatePicker onChange={() => []} placeholderText="Data de início" />
        <DatePicker onChange={() => []} placeholderText="Data final" />
      </div>

      <Input placeholder={`Números de hóspedes max: (${tripDetails.maxGuests})`} className="mt-3" />

      <div className="flex items-center justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total de:</p>
        <p className="font-medium text-sm text-primaryDarker">R$ 5000</p>
      </div>

      <div className="border-b pb-10 border-grayLighter">
        <Button className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  )
}
