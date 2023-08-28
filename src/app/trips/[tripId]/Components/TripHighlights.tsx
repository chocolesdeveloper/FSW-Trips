import Image from "next/image"

interface TripHighlightsProps {
  highlights: string[]
}

export function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className="flex flex-col px-5 mt-10 gap-2">
      <h2 className="font-semibold text-primaryDarker">Destaques</h2>

      <div className="flex flex-wrap gap-y-2">
        {highlights.map((highlight, index) => (
          <div className="flex items-center gap-1 w-2/4" key={`${index} - ${highlight}`}>
            <div className="relative w-4 h-4">
              <Image src="/check-icon.png" alt="Icon Check" fill style={{ objectFit: "cover" }} />
            </div>

            <p className="text-xs text-grayPrimary">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
