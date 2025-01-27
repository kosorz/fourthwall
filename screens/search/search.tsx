import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { SearchParams } from "next/dist/server/request/search-params"
import Form from "next/form"

type Props = { searchParams: Promise<SearchParams> }

export async function SearchScreen({ searchParams }: Props) {
  const { q } = await searchParams

  return (
    <Form action="/" className="flex gap-4 items-center mb-5" aria-label="Search form">
      <Input
        defaultValue={q}
        placeholder="Search for your next star ⭐"
        id="search-input"
        name="q"
        maxLength={120}
        aria-label="Search input"
      />
      <Button className="font-semibold" type="submit">
        Search
      </Button>
    </Form>
  )
}
