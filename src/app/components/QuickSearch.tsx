import Image from "next/image"

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
          <button className="flex flex-col items-center gap-1">
            <Image src="/hotel-icon.png" alt="Hotel" width={25} height={25} />
            <p className="text-grayPrimary text-sm">Hotel</p>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Image src="/farm-icon.png" alt="Hotel" width={25} height={25} />
            <p className="text-grayPrimary text-sm">Fazenda</p>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Image src="/cottage-icon.png" alt="Hotel" width={25} height={25} />
            <p className="text-grayPrimary text-sm">Chalé</p>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Image src="/inn-icon.png" alt="Hotel" width={25} height={25} />
            <p className="text-grayPrimary text-sm">Pousada</p>
          </button>
        </div>
      </div>
    </div>
  )
}
