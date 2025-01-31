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
      <Form onSubmit={start} action="/" className="gap-4 flex" aria-label="Search form">
        <div className="mb-2 flex-grow">
          <label htmlFor="search-input" className="block mb-2">
            Search repositories by name, author and more...
          </label>
          <Input
            defaultValue={searchParams.get("q") || ""}
            placeholder="Find next star ⭐"
            id="search-input"
            name="q"
            maxLength={120}
            required
            aria-label="Search input"
          />
        </div>

        <Button className="font-semibold mb-2 block self-end" type="submit">
          Search
        </Button>
      </Form>

      <Link
        aria-label="Link to cheat-sheet"
        target="__blank"
        passHref
        className="mb-5 block"
        href="https://www.freecodecamp.org/news/github-search-tips/#:~:text=How%20to%20Search%20Repositories"
      >
        Psst.. here's a <span className="font-semibold ">cheat-sheet</span>!
      </Link>
    </>
  )
}
