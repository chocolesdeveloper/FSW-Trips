import { Trip } from "@prisma/client"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface TripItemProps {
  trip: Trip
}

export function TripItem({ trip }: TripItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-[320px] h-[280px]">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          fill
          sizes="320px"
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="font-medium text-primaryDarker text-sm">{trip.name}</h3>
      <div className="flex items-center gap-2">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-xs text-grayPrimary">{trip.location}</p>
      </div>
      <p className="text-sm">
        <span className="font-medium text-primary text-base"> R${Number(trip.pricePerDay)}</span>{" "}
        por dia
      </p>
    </div>
  )
}
