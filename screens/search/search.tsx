"use client"

import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import Form from "next/form"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { start } from "nprogress"

export function SearchScreen() {
  const searchParams = useSearchParams()

  return (
    <>
      <Form onSubmit={start} action="/" className="mb-2 grid grid-cols-4 gap-2 col" aria-label="Search form">
        <label htmlFor="search-input" className="col-span-4">
          Search repositories by name, author and more...
        </label>
        <Input
          defaultValue={searchParams.get("q") || ""}
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
        className="mb-5 inline-block"
        href="https://www.freecodecamp.org/news/github-search-tips/#:~:text=How%20to%20Search%20Repositories"
      >
        Psst.. here's a <span className="font-semibold ">cheat-sheet</span>!
      </Link>
    </>
  )
}
