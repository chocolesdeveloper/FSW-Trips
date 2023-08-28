import { NextAuthProvider } from "@/providers/auth"

import "./globals.css"

import type { Metadata } from "next"

import { Poppins } from "next/font/google"
import { Header } from "../Components/Header"
import { Footer } from "@/Components/Footer"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Fsw Trips",
  description: "Sistema de reserva de viagens.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <div className="flex flex-col h-screen">
            <div className="h-[94px]">
              <Header />
            </div>
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <ToastContainer autoClose={3000} position="bottom-center" />
        </NextAuthProvider>
      </body>
    </html>
  )
}
