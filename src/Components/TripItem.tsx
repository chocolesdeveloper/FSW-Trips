import { Trip } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Location } from "./Location"

interface TripItemProps {
  trip: Trip
}

export function TripItem({ trip }: TripItemProps) {
  const path = trip ? `/trips/${trip.id}` : "/"

  return (
    <Link href={path} as={`/trips/${trip.id}`} className="flex flex-col gap-1">
      <div className="relative w-[320px] h-[280px]">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="font-medium text-primaryDarker text-sm">{trip.name}</h3>

      <Location countryCode={trip.countryCode} location={trip.location} />

      <p className="text-sm">
        <span className="font-medium text-primary text-base"> R${Number(trip.pricePerDay)}</span>{" "}
        por dia
      </p>
    </Link>
  )
}
