import { prisma } from "@/lib/prisma"
import { Trip } from "@prisma/client"
import { TripHeader } from "./Components/TripHedar"
import { TripReservation } from "./Components/TripReservation"
import { TripDescription } from "./Components/TripDescription"
import { TripHighlights } from "./Components/TripHighlights"
import { TripLocation } from "./Components/TripLocation"

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
    <div className="container mx-auto flex flex-col lg:px-40">
      <TripHeader tripDetails={tripDetails} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripId={tripDetails.id}
            tripStartDate={tripDetails.startDate}
            tripEndDate={tripDetails.endDate}
            maxGuests={tripDetails.maxGuests}
            pricePorDay={Number(tripDetails.pricePerDay)}
          />
        </div>
        <div className="lg:order-1">
          <TripDescription description={tripDetails.description} />
          <TripHighlights highlights={tripDetails.highlights} />
        </div>
      </div>
      <TripLocation
        location={tripDetails.location}
        locationDescription={tripDetails.locationDescription}
      />
    </div>
  )
}
