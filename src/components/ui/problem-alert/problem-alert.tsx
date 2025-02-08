import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert/alert"
import { ReactNode } from "react"

type Props = {
  title: string
  description: string
  Icon?: ReactNode
  variant?: "destructive" | "default"
  actionSlot?: ReactNode // Allows flexible button or custom actions
}

export function ProblemAlert({ title, description, Icon, variant = "destructive", actionSlot }: Props) {
  return (
    <Alert variant={variant} className="mt-5">
      {Icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {actionSlot && <div className="mt-3 ml-6">{actionSlot}</div>}
    </Alert>
  )
}
