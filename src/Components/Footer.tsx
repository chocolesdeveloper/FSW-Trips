import Image from "next/image"

export function Footer() {
  return (
    <div className="bg-walterWhite p-5 flex flex-col items-center gap-2 mt-5">
      <Image src="/logo.svg" alt="logo FSW" width={133} height={23} />
      <p className="text-sm font-semibold text-primaryDarker">Todos os direitos reservados</p>
    </div>
  )
}
