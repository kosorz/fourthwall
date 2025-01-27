"use client"

import { ProblemAlert } from "@/components/domain/problem-alert/problem-alert"
import { LuServerCrash } from "react-icons/lu"

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <ProblemAlert
      Icon={<LuServerCrash className="h-4 w-4" />}
      title="Heads up!"
      description={"Something went wrong. Try again later!"}
      reset={reset}
    />
  )
}
