"use client"

import Button from "@/Components/Button"
import DatePicker from "@/Components/DatePicker"
import Input from "@/Components/Input"
import { addDays, differenceInDays, isBefore } from "date-fns"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

interface TripReservationProps {
  tripId: string
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
  tripId,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<TripReservationForm>()

  const router = useRouter()

  async function onSubmit(data: TripReservationForm) {
    try {
      const response = await fetch("/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        }),
      })

      const res = await response.json()

      if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
        setError("startDate", {
          type: "manual",
          message: "Esta data já está reservada.",
        })

        return setError("endDate", {
          type: "manual",
          message: "Esta data já está reservada.",
        })
      }

      if (["INVALID_END_DATE", "INVALID_START_DATE"].includes(res?.error?.code)) {
        setError("startDate", {
          type: "manual",
          message: "Data inválida.",
        })

        return setError("endDate", {
          type: "manual",
          message: "Data inválida.",
        })
      }

      router.push(
        `/trips/${tripId}/confirmation?startDate=${data.startDate.toISOString()}&endDate=${data.endDate.toISOString()}&maxGuests=${
          data.guests
        }`
      )
    } catch (error) {
      console.log(`Ocorreu um erro: ${error}`)
    }
  }

  const startDate = watch("startDate")
  const endDate = watch("endDate")

  return (
    <form
      className="flex flex-col px-2 lg:min-w-[380px] lg:p-5 lg:border lg:border-primaryLighter lg:rounded-lg lg:shadow-md "
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="hidden text-xl text-primaryDarker mb-4 lg:blo">
        <span className="font-semibold">R${pricePorDay} por dia</span>
      </p>
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
              placeholderText="Data incial"
              minDate={
                isBefore(new Date(tripStartDate), new Date())
                  ? new Date()
                  : addDays(tripStartDate, 1)
              }
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
        type="number"
        className="mt-3"
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
          max: {
            value: maxGuests,
            message: `Número maxíma de hóspedes é ${maxGuests} hóspedes`,
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

      <div className="border-b pb-10 border-grayLighter lg:border-none lg:pb-0">
        <Button className="mt-3 w-full">Reservar agora</Button>
      </div>
    </form>
  )
}
