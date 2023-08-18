interface TripDescriptionProps {
  description: string
}

export function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="flex flex-col px-5 mt-10">
      <h2 className="font-semibold text-primaryDarker">Sobre a viagem</h2>

      <p className="mt-1 text-sm leading-5">{description}</p>
    </div>
  )
}
