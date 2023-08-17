import { TripItem } from "@/Components/TripItem"
import { prisma } from "@/lib/prisma"

async function fetchTrips() {
  const trips = await prisma.trip.findMany()

  return trips
}

export async function RecommendedTrips() {
  const trips = await fetchTrips()

  return (
    <div className="container mx-auto px-5 mt-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayPrimary" />
        <h2 className="font-medium text-grayPrimary px-5 text whitespace-nowrap">
          Destinos recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayPrimary" />
      </div>

      <div className="flex flex-col items-center gap-5 mt-4">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
