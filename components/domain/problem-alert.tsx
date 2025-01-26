import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  Icon: ReactNode | ReactNode[]
  reset: () => void
}

export function ProblemAlert({ title, description, Icon, reset }: Props) {
  return (
    <Alert variant="destructive">
      {Icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <Button className="mt-3 ml-6" size="lg" variant={"destructive"} onClick={() => reset()}>
        Try again
      </Button>
    </Alert>
  )
}
