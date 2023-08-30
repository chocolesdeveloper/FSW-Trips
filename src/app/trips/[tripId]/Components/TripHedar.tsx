import { Location } from "@/Components/Location"
import { Trip } from "@prisma/client"
import Image from "next/image"

interface TripHeaderProps {
  tripDetails: Trip
}

export function TripHeader({ tripDetails }: TripHeaderProps) {
  return (
    <>
      <div className="relative w-full h-[280px] lg:hidden">
        <Image
          src={tripDetails.coverImage}
          alt={tripDetails.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 order-[-1]">
        <div className="relative row-span-2">
          <Image
            src={tripDetails.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={tripDetails.name}
            className="rounded-tl-lg rounded-bl-lg shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={tripDetails.imagesUrl[0]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={tripDetails.name}
            className="shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={tripDetails.imagesUrl[1]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={tripDetails.name}
            className="shadow-md  rounded-tr-lg"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={tripDetails.imagesUrl[2]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={tripDetails.name}
            className="shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={tripDetails.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={tripDetails.name}
            className="shadow-md  rounded-br-lg"
          />
        </div>
      </div>
      <div className="flex flex-col p-5 gap-1 lg:order-[-2] lg:p-0 lg:mb-10">
        <h1 className="font-semibold text-xl text-primaryDarker lg:text-3xl">{tripDetails.name}</h1>

        <Location
          countryCode={tripDetails.countryCode}
          location={tripDetails.location}
          locationUnderline
        />

        <p className="text-xs text-grayPrimary lg:hidden">
          <span className="text-primary text-sm font-medium">
            R${Number(tripDetails.pricePerDay)}
          </span>{" "}
          por dia
        </p>
      </div>
    </>
  )
}
