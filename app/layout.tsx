import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import React, { ReactNode, Suspense } from "react"
import Image from "next/image"
import NextTopLoader from "nextjs-toploader"

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const robotoMonoFont = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Foruthwall x Github",
  description: "Foruthwall assignment",
}

type Props = Readonly<{
  search: ReactNode
  children: ReactNode
  results: ReactNode
  details: ReactNode
}>

export default function Layout({ results, children, details, search }: Props) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${robotoMonoFont.variable} antialiased`}>
        <NextTopLoader color="#0f172a" height={5} />
        <main className="flex flex-col align-top p-4 sm:p-6 lg:p-8">
          <section className="flex justify-center my-4" aria-label="Logos section">
            <a className="flex gap-2 items-center" href="/">
              <Image priority alt="Fourthwall logo" width={112} height={20} src="/fourthwall.svg" />
              <span className="font-semibold">x</span>
              <Image priority alt="GitHub logo" width={50} height={50} src="/github.svg" />
            </a>
          </section>
          <section className="w-full max-w-3xl m-auto">
            <main className="mt-5">
              <Suspense>
                {children}
                {search}
                {results}
                {details}
              </Suspense>
            </main>
          </section>
        </main>
      </body>
    </html>
  )
}
