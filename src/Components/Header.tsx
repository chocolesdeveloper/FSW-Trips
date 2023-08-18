"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { AiOutlineMenu } from "react-icons/ai"

export function Header() {
  const { status, data } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  function handleSignIn() {
    return signIn()
  }

  function handleSignOut() {
    setMenuIsOpen(!menuIsOpen)
    return signOut()
  }

  return (
    <div className="container mx-auto px-5 flex justify-between items-center h-[88px]">
      <Link href="/" as="/">
        <Image width={183} height={32} src="/logo.svg" alt="FullStackWeek Trips logo" />
      </Link>

      {status === "unauthenticated" ? (
        <button className="font-semibold text-primary p-2 text-sm" onClick={handleSignIn}>
          Login
        </button>
      ) : (
        <div className="flex items-center gap-5 px-4 py-3 rounded-full border border-grayLighter relative ">
          <AiOutlineMenu
            size={20}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="cursor-pointer"
          />

          {!data ? (
            <div className="animate-spin p-2 border-t-2 border-b-2 rounded-full border-primaryDarker" />
          ) : (
            <Image
              src={data?.user?.image!}
              alt={data?.user?.name!}
              width={28}
              height={28}
              priority={true}
              className="rounded-full"
            />
          )}

          {menuIsOpen && (
            <div className="absolute top-[55px] left-0 w-full h-full bg-white shadow-xl rounded-lg z-50">
              <button
                className="text-primary text-sm font-semibold w-full h-full"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
