"use client"

import { ProblemAlert } from "@/src/components/ui/problem-alert/problem-alert"
import { Button } from "@/src/components/ui/button/button"
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
      actionSlot={<Button variant={"destructive"} onClick={reset} />}
    />
  )
}
