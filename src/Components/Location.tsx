import { ComponentPropsWithoutRef } from "react"
import ReactCountryFlag from "react-country-flag"
import { twMerge } from "tailwind-merge"

interface LocationProps extends ComponentPropsWithoutRef<"div"> {
  countryCode: string
  location: string
  locationUnderline?: boolean
}

export function Location({
  className,
  countryCode,
  location,
  locationUnderline,
  ...props
}: LocationProps) {
  const divClassName = twMerge("flex items-center gap-2", className)
  const pClassName = locationUnderline
    ? "text-xs text-grayPrimary underline"
    : "text-xs text-grayPrimary"

  return (
    <div className={divClassName} {...props}>
      <ReactCountryFlag countryCode={countryCode} svg />
      <p className={pClassName}>{location}</p>
    </div>
  )
}
