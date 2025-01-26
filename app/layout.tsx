import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import React, { ReactNode, Suspense } from "react"

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

export default function Layout({
  children,
  githubRepositories,
}: Readonly<{
  children: ReactNode
  githubRepositories: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${robotoMonoFont.variable} antialiased`}>
        <main className="flex justify-center p-4 sm:p-6 lg:p-8">
          <section className="w-full max-w-3xl">
            {children}
            {githubRepositories}
          </section>
        </main>
      </body>
    </html>
  )
}
