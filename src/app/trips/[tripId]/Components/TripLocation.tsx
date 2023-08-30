import Button from "@/Components/Button"
import Image from "next/image"

interface TripLocationProps {
  location: string
  locationDescription: string
}

export function TripLocation({ location, locationDescription }: TripLocationProps) {
  return (
    <div className="flex flex-col mt-10 px-5 lg:px-0 lg:mt-12 lg:pb-20">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">Localização</h2>

      <div className="relative w-full h-[280px] mb-5 lg:hidden">
        <Image src="/map-mobile.png" alt={location} fill style={{ objectFit: "cover" }} />
      </div>

      <div className="hidden relative w-full h-[480px] mb-5 lg:block">
        <Image src="/map-mobile.png" alt={location} fill style={{ objectFit: "cover" }} />
      </div>

      <h3 className="text-primaryDarker font-semibold text-sm mb-1 lg:text-base lg:mt-5">
        {location}
      </h3>

      <p className="text-xs text-primaryDarker leading-5 mb-5 lg:text-sm lg:mt-4">
        {locationDescription}
      </p>

      <Button variant="outlined">Buscar no Google</Button>
    </div>
  )
}
