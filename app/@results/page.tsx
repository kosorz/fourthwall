"use client"

import { ResultsScreen } from "@/screens/results/results"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default () => {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <ResultsScreen />
    </QueryClientProvider>
  )
}
