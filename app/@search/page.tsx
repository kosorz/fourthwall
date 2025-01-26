import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchParams } from "next/dist/server/request/search-params"
import Form from "next/form"

type Props = { searchParams: Promise<SearchParams> }

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams

  return (
    <Form action="/" className="flex gap-4 items-center mb-5" aria-label="Search form">
      <Input placeholder="Search for your next star ⭐" id="search-input" name="q" aria-label="Search input" />
      <Button className="font-semibold" type="submit">
        Search
      </Button>
    </Form>
  )
}
