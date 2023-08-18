import Button from "@/Components/Button"
import Image from "next/image"

interface TripLocationProps {
  location: string
  locationDescription: string
}

export function TripLocation({ location, locationDescription }: TripLocationProps) {
  return (
    <div className="flex flex-col mt-10 px-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>

      <div className="relative w-full h-[280px] mb-5">
        <Image src="/map-mobile.png" alt={location} fill style={{ objectFit: "cover" }} />
      </div>

      <h3 className="text-primaryDarker font-semibold text-sm mb-1">{location}</h3>

      <p className="text-xs text-primaryDarker leading-5 mb-5">{locationDescription}</p>

      <Button variant="outlined">Buscar no Google</Button>
    </div>
  )
}
