"use client"

import Button from "@/Components/Button"
import CurrencyInput from "@/Components/CurrencyInput"
import DatePicker from "@/Components/DatePicker"
import Input from "@/Components/Input"

export function TripSearch() {
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-xl text-primaryDarker text-center">
        Encotre sua próxima <span className="text-primary">viajem</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />

        <div className="flex gap-4">
          <DatePicker placeholderText="Data de ida" onChange={() => {}} />
          <CurrencyInput placeholder="Quanto quer gastar?" />
        </div>

        <Button>Pesquisar</Button>
      </div>
    </div>
  )
}
