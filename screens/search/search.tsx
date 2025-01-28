"use client"

import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import Form from "next/form"
import { useSearchParams } from "next/navigation"
import { start } from "nprogress"

export function SearchScreen() {
  const searchParams = useSearchParams()

  return (
    <Form onSubmit={start} action="/" className="flex gap-4 items-center mb-5" aria-label="Search form">
      <Input
        defaultValue={searchParams.get("q") || ""}
        placeholder="Find next star ⭐"
        id="search-input"
        name="q"
        maxLength={120}
        required
        aria-label="Search input"
      />
      <Button className="font-semibold" type="submit">
        Search
      </Button>
    </Form>
  )
}
