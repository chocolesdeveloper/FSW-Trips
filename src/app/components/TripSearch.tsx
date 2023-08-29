"use client"

import Button from "@/Components/Button"
import CurrencyInput from "@/Components/CurrencyInput"
import DatePicker from "@/Components/DatePicker"
import Input from "@/Components/Input"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

interface TripSearchForm {
  text: string
  startDate?: Date | null
  budget?: number
}

export function TripSearch() {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>()

  function onSubmit(data: TripSearchForm) {
    const { text, startDate, budget } = data

    router.push(`/trips/search?text=${text}&startDate=${startDate?.toISOString()}&budget=${budget}`)
  }

  return (
    <form
      className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-semibold text-xl text-primaryDarker text-center lg:text-4xl">
        Encotre sua próxima <span className="text-primary">viajem</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg lg:mt-12">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors?.text}
          errorMessage={errors?.text?.message}
          {...register("text", { required: { value: true, message: "Texto é obrigatório." } })}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange as any}
                selected={field.value}
                placeholderText="Data de partida"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                allowDecimals={false}
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button className="lg:w-1/4">Pesquisar</Button>
      </div>
    </form>
  )
}
