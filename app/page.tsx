import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchParams } from "next/dist/server/request/search-params"
import Form from "next/form"
import Image from "next/image"
import { Suspense } from "react"

type Props = { searchParams: Promise<SearchParams> }

export const experimental_ppr = true

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams

  return (
    <Suspense>
      <section className="flex justify-center gap-4 items-center my-4" aria-label="Logos section">
        <Image priority alt="Fourthwall logo" width={200} height={50} src="/fourthwall.svg" />
        <span className="font-semibold">X</span>
        <Image priority alt="GitHub logo" width={50} height={50} src="/github.svg" />
      </section>
      <Form action="/" className="flex gap-4 items-center" aria-label="Search form">
        <Input
          placeholder="Search for your next star ⭐"
          id="search-input"
          defaultValue={q}
          name="q"
          aria-label="Search input"
        />
        <Button className="font-semibold" type="submit">
          Search
        </Button>
      </Form>
    </Suspense>
  )
}
