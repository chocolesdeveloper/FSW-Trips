import { prisma } from "@/lib/prisma"
import { Trip } from "@prisma/client"
import { TripHeader } from "./Components/TripHedar"
import { TripReservation } from "./Components/TripReservation"

async function getTripDetais(tripId: string) {
  const tripDetails = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  })

  return tripDetails
}

export default async function TripDetails({ params }: { params: { tripId: string } }) {
  const tripDetails: Trip | null = await getTripDetais(params.tripId)

  if (!tripDetails) return

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <TripHeader tripDetails={tripDetails} />

        <TripReservation tripDetails={tripDetails} />
      </div>
    </div>
  )
}
