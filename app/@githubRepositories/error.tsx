"use client"

import { ProblemAlert } from "@/components/domain/problem-alert"
import { ServerCrash } from "lucide-react"

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <ProblemAlert
      Icon={<ServerCrash className="h-4 w-4" />}
      title="Heads up!"
      description={`
        Something went wrong: ${error.message}.
        
        Try again later!`}
      reset={reset}
    />
  )
}
