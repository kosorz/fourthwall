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
        className="mb-5"
        href="https://gist.github.com/bonniss/4f0de4f599708c5268134225dda003e0#repository-search:~:text=results%20containing%20cat.-,Repository,-search"
      >
        Psst.. here's a <span className="font-semibold ">cheat-sheet</span>!
      </Link>
    </>
  )
}
