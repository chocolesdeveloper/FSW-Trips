"use client"

import Button from "@/Components/Button"
import DatePicker from "@/Components/DatePicker"
import Input from "@/Components/Input"
import { addDays, differenceInDays } from "date-fns"
import { Controller, useForm } from "react-hook-form"

interface TripReservationProps {
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
  pricePorDay: number
}

interface TripReservationForm {
  startDate: Date
  endDate: Date
  guests: number
}

export function TripReservation({
  tripEndDate,
  tripStartDate,
  maxGuests,
  pricePorDay,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TripReservationForm>()

  function onSubmit(data: TripReservationForm) {
    console.log(data)
  }

  const startDate = watch("startDate")
  const endDate = watch("endDate")

  return (
    <form className="flex flex-col px-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-3 ">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              placeholderText="Data final"
              minDate={new Date()}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              disabled={startDate === undefined ? true : false}
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              placeholderText="Data final"
              minDate={addDays(startDate, 1)}
              maxDate={tripEndDate}
            />
          )}
        />
      </div>

      <Input
        placeholder={`Números de hóspedes max: (${maxGuests})`}
        className="mt-3"
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
        })}
        error={!!errors.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex items-center justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        {startDate && endDate ? (
          <p className="font-medium text-sm text-primaryDarker">
            R$ {differenceInDays(endDate, startDate) * pricePorDay}
          </p>
        ) : (
          <p className="font-medium text-sm text-primaryDarker">R$ 0</p>
        )}
      </div>

      <div className="border-b pb-10 border-grayLighter">
        <Button className="mt-3 w-full">Reservar agora</Button>
      </div>
    </form>
  )
}
