import { Location } from "@/Components/Location"
import { Trip } from "@prisma/client"
import Image from "next/image"

interface TripHeaderProps {
  tripDetails: Trip
}

export function TripHeader({ tripDetails }: TripHeaderProps) {
  return (
    <>
      <div className="relative w-full h-[280px]">
        <Image
          src={tripDetails.coverImage}
          alt={tripDetails.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority
        />
      </div>
      <div className="flex flex-col p-5 gap-1">
        <h1 className="font-semibold text-xl text-primaryDarker">{tripDetails.name}</h1>

        <Location
          countryCode={tripDetails.countryCode}
          location={tripDetails.location}
          locationUnderline
        />

        <p className="text-xs text-grayPrimary">
          <span className="text-primary text-sm font-medium">
            R${Number(tripDetails.pricePerDay)}
          </span>{" "}
          por dia
        </p>
      </div>
    </>
  )
}
