"use client"

import { Button } from "@/src/components/ui/button/button"
import { Input } from "@/src/components/ui/input/input"
import Form from "next/form"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { start } from "nprogress"
import { useMemo } from "react"

export function SearchScreen() {
  const searchParams = useSearchParams()

  // It's not really a performance optimization (it wouldn't be justified)
  // this is to retain value in the input while route changes to the one that invokes modal ->
  // changing the url -> removing the q from search -> clearing the input value under the dialog backdrop
  const defaultValue = useMemo(() => {
    return searchParams.get("q") || ""
  }, [])

  return (
    <>
      <Form onSubmit={start} action="/" className="mb-2 grid grid-cols-4 gap-2" aria-label="Search form">
        <label htmlFor="search-input" className="col-span-4">
          Search repositories by name, author and more...
        </label>
        <Input
          defaultValue={defaultValue}
          placeholder="Find next star ⭐"
          id="search-input"
          name="q"
          className="col-span-3"
          maxLength={120}
          required
          aria-label="Search input"
        />

        <Button className="font-semibold block self-end col-span-1 mb-3" type="submit">
          Search
        </Button>
      </Form>

      <Link
        aria-label="Link to cheat-sheet"
        target="__blank"
        passHref
        className="mb-5 inline-block text-sm"
        href="https://www.freecodecamp.org/news/github-search-tips/#:~:text=How%20to%20Search%20Repositories"
      >
        Psst.. here's a <span className="font-semibold">cheat-sheet</span>!
      </Link>
    </>
  )
}
