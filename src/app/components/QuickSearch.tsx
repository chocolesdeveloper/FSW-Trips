import Image from "next/image"
import Link from "next/link"

export function QuickSearch() {
  return (
    <div className="container mx-auto mt-5 px-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayPrimary" />
        <h2 className="font-medium text-grayPrimary px-5 text whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayPrimary" />
      </div>

      <div className="flex items-center mt-5">
        <div className="flex w-full justify-around">
          <div className="flex flex-col items-center gap-1">
            <Link href={`/trips/search?text=hotel`}>
              <div className="flex flex-col items-center">
                <Image src="/hotel-icon.png" alt="Hotel" width={25} height={25} />
                <p className="text-grayPrimary text-sm">Hotel</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Link href={`/trips/search?text=fazenda`}>
              <div className="flex flex-col items-center">
                <Image src="/farm-icon.png" alt="Fazenda" width={25} height={25} />
                <p className="text-grayPrimary text-sm">Fazenda</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Link href={`/trips/search?text=chalé`}>
              <div className="flex flex-col items-center">
                <Image src="/cottage-icon.png" alt="Chale" width={25} height={25} />
                <p className="text-grayPrimary text-sm">Chalé</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Link href={`/trips/search?text=pousada`}>
              <div className="flex flex-col items-center">
                <Image src="/inn-icon.png" alt="Pousada" width={25} height={25} />
                <p className="text-grayPrimary text-sm">Pousada</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
