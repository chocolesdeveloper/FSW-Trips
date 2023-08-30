interface TripDescriptionProps {
  description: string
}

export function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="flex flex-col px-5 mt-10 lg:px-0">
      <h2 className="font-semibold text-primaryDarker lg:text-xl">Sobre a viagem</h2>

      <p className="mt-1 text-sm leading-5 lg:mt-5 lg:text-base lg:leading-7">{description}</p>
    </div>
  )
}
