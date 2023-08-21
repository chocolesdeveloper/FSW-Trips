import { prisma } from "@/lib/prisma"
import { Trip } from "@prisma/client"
import { TripHeader } from "./Components/TripHedar"
import { TripReservation } from "./Components/TripReservation"
import { TripDescription } from "./Components/TripDescription"
import { TripHighlights } from "./Components/TripHighlights"

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
        <TripReservation
          tripStartDate={tripDetails.startDate}
          tripEndDate={tripDetails.endDate}
          maxGuests={tripDetails.maxGuests}
        />
        <TripDescription description={tripDetails.description} />
        <TripHighlights highlights={tripDetails.highlights} />
      </div>
    </div>
  )
}
